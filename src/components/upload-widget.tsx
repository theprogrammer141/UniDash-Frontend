import {useEffect, useRef, useState} from "react";
import {UploadWidgetProps, UploadWidgetValue} from "@/types";
import {UploadCloud} from "lucide-react";
import {getCloudinaryUploadConfig} from "@/constants";

const UploadWidget = ({value = null, onChange, disabled = false}: UploadWidgetProps) => {
    const widgetRef = useRef<CloudinaryWidget | null>(null);
    const onChangeRef = useRef(onChange);

    const [preview, setPreview] = useState<UploadWidgetValue | null>(value);

    const openWidget = () => {
        if(!disabled) widgetRef.current?.open();
    }

    useEffect(() => {
        setPreview(value);
    }, [value]);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if(typeof window === "undefined") return;

        let intervalId: number | undefined;

        const initializeWidget = () => {
            if(!window.cloudinary || widgetRef.current) return false;

            const {cloudName, uploadPreset} = getCloudinaryUploadConfig();

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName,
                uploadPreset,
                multiple: false,
                folder: 'uploads',
                maxFileSize: 5000000,
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
            }, (error, result) => {
                if(!error && result.event === 'success') {
                    const payload: UploadWidgetValue = {
                        url: result.info.secure_url,
                        publicId: result.info.public_id,
                    }

                    setPreview(payload);
                    onChangeRef.current?.(payload);
                }
            });
            return true;
        }

        if(!initializeWidget()) {
            intervalId = window.setInterval(() => {
                if(initializeWidget()){
                    window.clearInterval(intervalId);
                    intervalId = undefined;
                }
            }, 500);
        }

        return () => {
            if(intervalId !== undefined) window.clearInterval(intervalId);
            widgetRef.current?.destroy();
            widgetRef.current = null;
        };
    }, []);

    return (
        <div className={"space-y-2"}>
            {preview ? (
                <div className={"upload-preview"}>
                    <img src={preview.url} alt={"Banner preview"}/>
                </div>
            ) : <div
                className={"upload-dropzone"}
                role={"button"}
                tabIndex={0}
                onClick={openWidget}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openWidget();
                    }
                }}
            >
                <div className={"upload-prompt"}>
                    <UploadCloud className={"icon"}/>
                    <div>
                        <p>Click to upload</p>
                        <p>PNG, JPG upto 5MB</p>
                    </div>
                </div>
            </div> }
        </div>
    )
}
export default UploadWidget

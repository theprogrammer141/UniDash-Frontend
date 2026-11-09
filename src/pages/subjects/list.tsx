import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DEPARTMENT_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";

const SubjectsList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("all");

    return (
        <ListView>
            <Breadcrumb />
            <h1 className={"page-title"}>Subjects</h1>
            <div className={"intro-row"}>
                <p>Quick access to essential metrics and management tools.</p>

                <div className={"actions-row"}>
                    <div className={"search-field"}>
                        <Search className="search-icon"/>

                        <Input
                            type="text"
                            placeholder="Search by name..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={"flex gap-2 w-full sm:w-auto"}>
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"all"}>
                                    All Departments
                                </SelectItem>
                                {DEPARTMENT_OPTIONS.map((department) => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CreateButton />
                    </div>
                </div>
            </div>
        </ListView>
    )
}
export default SubjectsList

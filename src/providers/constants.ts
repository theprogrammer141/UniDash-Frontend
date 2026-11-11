import {Subject} from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS201",
        name: "Data Structures and Algorithms",
        department: "CS",
        description: "Core data structures — arrays, linked lists, trees, graphs — and the algorithms that operate on them, with an emphasis on complexity analysis.",
        createdAt: "2026-01-15T09:00:00.000Z",
    },
    {
        id: 2,
        code: "MATH301",
        name: "Linear Algebra",
        department: "Math",
        description: "Vector spaces, matrices, linear transformations, and eigenvalues, with applications to systems of equations and geometry.",
        createdAt: "2026-01-16T09:00:00.000Z",
    },
    {
        id: 3,
        code: "ENG102",
        name: "Academic Writing",
        department: "English",
        description: "Building clear, well-structured academic essays through argument development, research, and proper citation practices.",
        createdAt: "2026-01-17T09:00:00.000Z",
    },
];
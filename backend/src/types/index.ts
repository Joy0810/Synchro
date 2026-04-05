import { Request } from "express";

export interface JWTPayload{
    userId:string;
    email:string;
    role:"student" | "admin";
}

export interface AuthRequest extends Request{
    user?:JWTPayload;
}

export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
    role:"student" | "admin";
    created_at:Date;
}

export interface Group{
    id:string;
    name:string;
    owner_id:string;
    created_at:Date;
}

export interface Assignment{
    id:string;
    title:string;
    description:string;
    due_date:Date;
    drive_link?:string;
    created_by:string;
    assigned_to:"all" | "specific";
    created_at:Date;
}

export interface Submission{
    id:string;
    assignment_id:string;
    group_id:string;
    confirmed_by:string;
    confirmed_at:Date;
}

export interface ApiResponse<T=unknown>{
    success:boolean;
    data?:T;
    message?:string;
}

export interface AnalyticsOverview{
    total_groups:number;
    total_assignments:number;
    submitted_count:number;
    pending_count:number;

}
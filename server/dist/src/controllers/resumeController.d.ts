import { Request, Response } from "express";
export declare const createResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResumes: (req: Request, res: Response) => Promise<void>;
export declare const getResumeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDashboardStats: (req: Request, res: Response) => Promise<void>;
export declare const updateStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=resumeController.d.ts.map
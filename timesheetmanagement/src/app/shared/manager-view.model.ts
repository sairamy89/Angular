export class ManagerView {
    project: string;
    employee: {
        uid: string;
        proj_name: string;
    };
    d: Date;
}

export class EmpTimeSheets {
    $key: string;
    empID: string;
    empName: string;
    tsID: string;
    project: string;
    task: string;
    duration: string;
    approved: boolean;
    comment: string;
}

export class ProjectView {
    $key: string;
    empCount: string;
    mgr_id: string;
    mgr_name: string;
    mgr_uid: string;
    proj_id: string;
    proj_name: string;
}

export class Result {
  constructor(private status: Status, private catchable: unknown) {}

  public setStatus(status: Status) {
    this.status = status;
  }

  public setCatchable(catchable: unknown) {
    this.catchable = catchable;
  }

  public getStatus(): Status {
    return this.status;
  }

  public getCatchable(): unknown {
    return this.catchable;
  }
}

export enum Status {
  DRAFT,
  SUBMIT,
  PROCESS,
  PENDING,
  FAIL,
  SUCCESS,
  ABORT,
  RESUME,
}

import { Result, Status } from "./Result.ts";

export class Task {
  private result: Result;

  constructor() {
    this.result = new Result(Status.DRAFT, undefined);
  }

  private doProcess(): void {
    this.result.setStatus(Status.SUCCESS);
  }

  public process() {
    try {
      this.doProcess();
    } catch (e) {
      this.result.setCatchable(e);
      this.result.setStatus(Status.FAIL);
    }
  }

  public getResult(): Result {
    return this.result;
  }
}

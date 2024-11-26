import { Status } from "./Result.ts";
import { Task } from "./Task.ts";

export class Workflow {
  constructor(private tasks: Task[]) {}

  private process(index: number): Status {
    if (this.tasks.length == 0) {
      return Status.SUCCESS;
    }
    let _status: Status;
    let _shouldProcess = false;
    for (; index < this.tasks.length; index++) {
      const _task = this.tasks[index];
      _task.process();
      _status = _task.getResult().getStatus();
      switch (_status) {
        case Status.FAIL:
          _shouldProcess = false;
          break;
        default:
          _shouldProcess = true;
      }
      if (!_shouldProcess) {
        break;
      }
    }
    return _status!;
  }

  public resume(): Status {
    for (let index = 0; index < this.tasks.length; index++) {
      if (this.tasks[index].getResult().getStatus() != Status.FAIL) {
        continue;
      }
      return this.process(index);
    }
    return Status.SUCCESS;
  }

  public start(): Status {
    return this.process(0);
  }
}

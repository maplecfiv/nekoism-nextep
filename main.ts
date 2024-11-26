import { Status } from "./core/v1/models/workflow/Result.ts";
import { Task } from "./core/v1/models/workflow/Task.ts";
import { Workflow } from "./core/v1/models/workflow/Workflow.ts";

const tasks: Task[] = [];
tasks.push(new Task());
const workflow: Workflow = new Workflow(tasks);
console.debug(workflow.start(), Status.SUCCESS);

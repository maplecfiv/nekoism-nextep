import { Status } from "./core/models/Result.ts";
import { Task } from "./core/models/Task.ts";
import { Workflow } from "./core/models/Workflow.ts";

const tasks: Task[] = [];
tasks.push(new Task());
const workflow: Workflow = new Workflow(tasks);
console.debug(workflow.start(), Status.SUCCESS);

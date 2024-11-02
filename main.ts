import { Status } from "@nextep/core/models/Result.ts";
import { Task } from "@nextep/core/models/Task.ts";
import { Workflow } from "@nextep/core/models/Workflow.ts";

const tasks: Task[] = [];
tasks.push(new Task());
const workflow: Workflow = new Workflow(tasks);
console.debug(workflow.start(), Status.SUCCESS);

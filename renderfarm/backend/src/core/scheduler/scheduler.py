
class Scheduler:
    def __init__(self, worker_pool):
        self.worker_pool = worker_pool

    def get_free_worker(self):
        for worker in self.worker_pool:
            if worker["status"] == "free":
                return worker
        return None

    def assign_job(self, job):
        worker = self.get_free_worker()
        if worker is None:
            return None  

        worker["status"] = "busy"
        worker["current_job"] = job["id"]
        return worker

from collections import deque

class JobQueue:
    def __init__(self):
        self.queue = deque()

    def add_job(self, job):
        self.queue.append(job)

    def get_next_job(self):
        if len(self.queue) == 0:
            return None
        return self.queue.popleft()

    def size(self):
        return len(self.queue)

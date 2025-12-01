class Chunker:
    def __init__(self, frames_per_chunk=30):
        self.frames_per_chunk = frames_per_chunk

    def chunk_frames(self, total_frames):
        chunks = []
        start = 1

        while start <= total_frames:
            end = min(start + self.frames_per_chunk - 1, total_frames)
            chunks.append({"start": start, "end": end})
            start = end + 1

        return chunks

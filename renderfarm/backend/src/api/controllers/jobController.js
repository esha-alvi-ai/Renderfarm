// Creates job → extracts metadata → updates JSON template → chunks frames → schedules tasks

const {
  extractMetadata
} = require("../../services/metadata-extractor/metadataExtractor");

const {
  loadDefaultTemplate,
  updateTemplate
} = require("../../core/json-template/templateUpdater");

const {
  generateChunks
} = require("../../core/chunker/chunkGenerator");

const {
  queueTasks
} = require("../../core/scheduler/taskScheduler");

exports.createRenderJob = async (req, res) => {
  try {
    const { storageLocation, compName } = req.body;

    // 1. Extract metadata from uploaded project
    const metadata = await extractMetadata(storageLocation);

    // 2. Load default template JSON
    const template = await loadDefaultTemplate();

    // 3. Apply user + metadata values into template
    const updatedTemplate = await updateTemplate(template, metadata, req.body);

    // 4. Generate chunks (distributed tasks)
    const chunks = generateChunks(
      updatedTemplate.renderSettings.startFrame,
      updatedTemplate.renderSettings.endFrame,
      updatedTemplate.renderSettings.chunkSize
    );

    // 5. Queue tasks for workers
    await queueTasks(chunks, updatedTemplate);

    return res.status(200).json({
      message: "Render job created successfully",
      job: updatedTemplate,
      chunks
    });

  } catch (error) {
    console.error("Job Creation Error:", error);
    return res.status(500).json({ error: "Failed to create job" });
  }
};

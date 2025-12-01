import json
import os

class JSONTemplater:
    def __init__(self, template_path):
        self.template_path = template_path

    def load_template(self):
        with open(self.template_path, "r") as f:
            return json.load(f)

    def fill_template(self, data, output_path):
        template = self.load_template()

        for key in data:
            template[key] = data[key]

        with open(output_path, "w") as f:
            json.dump(template, f, indent=4)

        return output_path

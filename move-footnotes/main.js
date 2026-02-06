var obsidian = require('obsidian');

class FootnoteMoverPlugin extends obsidian.Plugin {
	async onload() {
		console.log("loading FootnoteMover");
		this.target = null;
		this.footnotes = null;
		
		this.move = () => {
			console.log("move");
			this.target = null;
			this.footnotes = null;
			var sections = this.app.workspace.activeLeaf.view.previewMode.renderer.sections;
			for (var i = 0; i < sections.length; i++){
				// console.log(sections[i]);
				if (sections[i].html.includes("<footnotes/>")){
					if (this.target == null){
						console.log("Target found");
						this.target = sections[i].el;
					}
				}
				if (sections[i].el.classList.contains("el-section")){
					if (sections[i].el.querySelector(".footnotes") != null){
						this.footnotes = sections[i].el;
						console.log("Footnotes found");
						if (this.target != null){
							console.log("Moved", this.target, this.footnotes);
							this.target.after(this.footnotes);
						}
					}
				}
			}
			if (this.target == null){
				console.log("Target not found");
			}
			if (this.footnotes == null){
				console.log("Footnotes not found");
			}
		}
		
		this.registerEvent(this.app.workspace.on("layout-change", this.move));
		this.registerEvent(this.app.workspace.on("editor-changed", this.move));
		// this.registerEvent(this.app.workspace.on("file-open", this.move));
		this.move();
	}
}

module.exports = FootnoteMoverPlugin;
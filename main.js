let segments = {
	"plain text":text_plain,
	"colored text":text_colored,
	"rainbow text":text_rainbow,
}



let message = []



function load_data() {
	let dropdown_content = ""
	let segment_types = Object.keys(segments)
	for (var i = 0; i <= segment_types.length - 1; i++) {
		let segment_type = segment_types[i];
		dropdown_content += "<a onclick=\"new_segment(" + i + ")\" class=\"unselectable\">" + segment_type + "</a>"
	}
	let dropdown = document.querySelectorAll("#select_segment_dropdown .dropdown_content");
	dropdown[0].innerHTML = dropdown_content;
}



function update_segment_display() {
	let segment_html = "";
	for (var i = 0; i < message.length; i++) {
		segment = message[i];
		segment_html +=
			"<div class=\"segment_container\">\
			<button class=\"delete_button\" onclick=\"delete_segment({1})\">X</button>{0}\
			</div>".format(segment.get_html(), i)
	}
	let container = document.getElementById("main_segment_container");
	container.innerHTML = segment_html;
	for (var i = container.children.length - 1; i >= 0; i--) {
		child = container.children[i];
		child.setAttribute("oninput", "process_data()");
	}
}



function update_result_display(argument) {
	let preview_segments = []
	let result_segments = []
	for (var i = 0; i < message.length; i++) {
		let segment = message[i]
		preview_segments.push(segment.get_preview())
		result_segments.push(segment.get_result())
	}
	let message_preview = preview_segments.join("")
	let message_result = result_segments.join("")
	document.getElementById("preview_area").innerHTML = message_preview
	document.getElementById("result_area").value = message_result
}



function reset_editor() {
	message = []
	update_segment_display()
	update_result_display()
}



function new_segment(segment_index) {
	let keys = Object.keys(segments)
	message.push(new segments[keys[segment_index]])
	console.log(message)
	update_segment_display()
}



function process_data() {
	let main_container = document.getElementById("main_segment_container");
	for (var i = 0; i < main_container.children.length; i++) {
		let segment_container = main_container.children[i]
		for (var j = 0; j < segment_container.children.length; j++) {
			let element = segment_container.children[j]
			if (element.classList.contains("input")) {
				message[i][element.id] = element.value
			}
		}
	}
	update_result_display()
}



function delete_segment(index) {
	message.splice(index, 1)
	update_segment_display()
	update_result_display()
}



function copy(copy_text) {
	copy_text.select();
	document.execCommand("copy");
}
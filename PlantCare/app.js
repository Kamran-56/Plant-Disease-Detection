document.getElementById("upload").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const fileInput = document.getElementById("imageInput");
    const previewImage = document.getElementById("previewImage");
    const resultSection = document.getElementById("resultSection");

    if (fileInput.files.length === 0) {
        alert("Please select an image first!");
        return;
    }

    // this will Show image preview
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
        // i am Calling FastAPI backend here
        const response = await fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.statusText);
        }

        const data = await response.json();

        // this will Show prediction result
        resultSection.style.display = "block";
        resultSection.innerHTML = `
            <h3>Prediction Result 🌿</h3>
            <p><strong>Class:</strong> ${data.class}</p>
            <p><strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%</p>
        `;
    } catch (error) {
        console.error("Error:", error);
        resultSection.style.display = "block";
        resultSection.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

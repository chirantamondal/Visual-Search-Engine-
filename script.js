const accessKey = "oxVahuLSVypuynnquR6UhH0ODGSwI3NCEPhV_EUqzBE";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const imageUpload = document.getElementById("image-upload");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let uploadedImage = null;

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            uploadedImage = reader.result; 
        };
        reader.readAsDataURL(file);
    }
});

async function searchImages() {
    searchResult.innerHTML = ""; 
    keyword = searchBox.value;
    let url = "";

    if (uploadedImage) {
        
        url = "YOUR_BACKEND_IMAGE_SEARCH_ENDPOINT"; 
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ image: uploadedImage }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        displayResults(data.results);
    } else if (keyword) {
        // If using text search
        url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    }
}

function displayResults(results) {
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

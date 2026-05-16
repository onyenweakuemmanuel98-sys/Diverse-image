
// ================= PAGE SWITCH =================

function showPage(pageId){

  document.querySelectorAll(".page")
  .forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById(pageId)
  .classList.add("active");

}

window.showPage = showPage;

// ================= PICTURE DATA =================
const pictureData = {

  Wedding:{
    Couple:[],
    Bride:[],
    Groom:[],
    Friends:[],
    Family:[]
  },

  Birthday:{
    Girls:[],
    Boys:[],
    Women:[],
    Men:[],
    Portrait:[]
  },

  Portraits:{
    Female:[],
    Male:[],
    Fashion:[],
    Traditional:[],
    Career:[]
  },

  Family:{
    Parents:[],
    "Dad and Son":[],
    "Dad and Daughter":[],
    "Mum and Son":[],
    "Mum and Daughter":[]
  },

  Lifestyle:{
    Fashion:[],
    Yoruba:[],
    Igbo:[],
    Hausa:[],
    Others:[]
  },

  Career:{
    Engineer:[],
    Lawyer:[],
    Nurse:[],
    Doctor:[],
    Others:[]
  },

  Events:{
    Concert:[],
    Wedding:[],
    Birthday:[],
    Traditional:[],
    Moments:[]
  }

};
const savedData =
localStorage.getItem("pictureData");

if(savedData){

  Object.assign(
    pictureData,
    JSON.parse(savedData)
  );

}

// ================= LOAD CATEGORIES =================

const pictureTabs =
document.getElementById("pictureTabs");

Object.keys(pictureData)
.forEach(category=>{

  pictureTabs.innerHTML += `
    <button onclick="showCategory('${category}')">
      ${category}
    </button>
  `;

});

// ================= SHOW CATEGORY =================

function showCategory(category){

  const subTabs =
  document.getElementById("subTabs");

  subTabs.innerHTML = "";

  Object.keys(pictureData[category])
  .forEach(sub=>{

    subTabs.innerHTML += `
      <button onclick="
      showSubCategory('${category}','${sub}')
      ">
      ${sub}
      </button>
    `;

  });

  const firstSub =
  Object.keys(pictureData[category])[0];

  showSubCategory(category,firstSub);

}

window.showCategory = showCategory;

// ================= SHOW SUBCATEGORY =================

function showSubCategory(category,sub){

  const gallery =
  document.getElementById("gallery");

  gallery.innerHTML = "";

  pictureData[category][sub]
  .forEach(image=>{

    gallery.innerHTML += `
      <img src="${image}"
      onclick="openViewer('${image}')">
    `;

  });

}

window.showSubCategory = showSubCategory;

// ================= OPEN FROM HOME =================

function openCategory(category,sub){

  showPage("pictures");

  showCategory(category);

  setTimeout(()=>{
    showSubCategory(category,sub);
  },100);

}

window.openCategory = openCategory;

// ================= IMAGE VIEWER =================

function openViewer(src){

  document.getElementById("viewer")
  .style.display = "flex";

  document.getElementById("viewerImg")
  .src = src;

}

function closeViewer(){

  document.getElementById("viewer")
  .style.display = "none";

}

window.openViewer = openViewer;
window.closeViewer = closeViewer;

// ================= DASHBOARD =================

function openDash(id){

  document.querySelectorAll(".dash-page")
  .forEach(page=>{
    page.classList.remove("activeDash");
  });

  document.getElementById(id)
  .classList.add("activeDash");

}

window.openDash = openDash;

function toggleSidebar(){

  document
  .getElementById("sidebar")
  .classList.toggle("active");

}

window.toggleSidebar = toggleSidebar;

// ================= CHARTS =================

new Chart(document.getElementById("lineChart"),{

  type:"line",

  data:{
    labels:["Jan","Feb","Mar","Apr","May","Jun"],

    datasets:[{
      label:"Visitors",
      data:[120,300,200,500,350,600]
    }]
  }

});

new Chart(document.getElementById("pieChart"),{

  type:"doughnut",

  data:{
    labels:["Instagram","Facebook","TikTok"],

    datasets:[{
      data:[55,25,20]
    }]
  }

});

// ================= MEDIA LIBRARY =================

let uploads = [];
// ================= CLOUDINARY =================

const cloudName = "db73zmc0w";
const uploadPreset = "Portfolio";

// ================= VIDEO DATA =================
// ================= VIDEO DATA =================

let videoData = {
  Wedding: [],
  Birthday: [],
  Portraits: [],
  Family: [],
  Lifestyle: [],
  Events: []
};

const savedVideos =
localStorage.getItem("videoData");

if(savedVideos){
  videoData = JSON.parse(savedVideos);
}

// ================= LOAD VIDEO TABS =================

const videoTabs =
document.getElementById("videoTabs");

videoTabs.innerHTML = `
<button onclick="renderVideos('All')">
All
</button>
`;

Object.keys(videoData).forEach(category=>{

  videoTabs.innerHTML += `
    <button onclick="renderVideos('${category}')">
      ${category}
    </button>
  `;

});

// ================= RENDER VIDEOS =================

function renderVideos(category="All"){

  const videoGrid =
  document.getElementById("videoGrid");

  videoGrid.innerHTML = "";

  // ALL VIDEOS
  if(category === "All"){

    Object.keys(videoData).forEach(cat=>{

      videoData[cat].forEach(video=>{

        videoGrid.innerHTML += `
          <div class="video-card">

            <video
              controls
              preload="metadata"
            >
              <source
                src="${video}"
                type="video/mp4"
              >
            </video>

          </div>
        `;

      });

    });

  }

  // SINGLE CATEGORY
  else{

    videoData[category].forEach(video=>{

      videoGrid.innerHTML += `
        <div class="video-card">

          <video
            controls
            preload="metadata"
          >
            <source
              src="${video}"
              type="video/mp4"
            >
          </video>

        </div>
      `;

    });

  }

}

renderVideos();
// // ================= IMAGE UPLOAD =================
async function uploadImage() {

  const file =
  document.getElementById("imageUpload").files[0];

  const category =
  document.getElementById("imageCategory").value;

  const subcategory =
  document.getElementById("imageSubcategory").value;

  if (!file) {
    alert("Select image");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);

  // MUST MATCH CLOUDINARY EXACTLY
  formData.append("upload_preset", "Portfolio");

  try {

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/db73zmc0w/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    console.log("IMAGE RESPONSE:", data);

    // ERROR CHECK
    if (data.error) {
      alert(data.error.message);
      return;
    }

    // SUCCESS CHECK
    if (!data.secure_url) {
      alert("secure_url missing");
      console.log(data);
      return;
    }

    // CREATE CATEGORY
    if (!pictureData[category]) {
      pictureData[category] = {};
    }

    // CREATE SUBCATEGORY
    if (!pictureData[category][subcategory]) {
      pictureData[category][subcategory] = [];
    }

    // PUSH IMAGE
    pictureData[category][subcategory]
    .push(data.secure_url);

    // SAVE
    localStorage.setItem(
      "pictureData",
      JSON.stringify(pictureData)
    );

    uploads.push(data.secure_url);

    renderUploads();

    showSubCategory(category, subcategory);

    alert("Image Uploaded Successfully");

  }

  catch (error) {

    console.log(error);

    alert("Upload Failed");

  }

}
// ================= VIDEO UPLOAD =================

async function uploadVideo(){

  const file =
  document.getElementById("videoUpload").files[0];

  const category =
  document.getElementById("videoCategory").value;

  if(!file){
    alert("Select video");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try{

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      {
        method:"POST",
        body:formData
      }
    );

    const data = await response.json();

    videoData[category]
    .push(data.secure_url);
    localStorage.setItem(
  "videoData",
  JSON.stringify(videoData)
);
    renderVideos(category);

    alert("Video Uploaded Successfully");

  }

  catch(error){

    console.log(error);

    alert("Video Upload Failed");

  }

}

window.uploadImage = uploadImage;
window.uploadVideo = uploadVideo;

// ================= RENDER UPLOADS =================

// ================= RENDER UPLOADS =================

function renderUploads(){

  const recent =
  document.getElementById("recentUploads");

  const del =
  document.getElementById("deleteList");

  if(!recent || !del) return;

  recent.innerHTML = "";
  del.innerHTML = "";

  // ================= IMAGES =================
  // ================= IMAGES =================

Object.keys(pictureData).forEach(category=>{

  Object.keys(pictureData[category]).forEach(subcategory=>{

    pictureData[category][subcategory]
    .forEach((img,index)=>{

      recent.innerHTML += `
        <img src="${img}"
        style="
        width:120px;
        height:120px;
        object-fit:cover;
        border-radius:10px;
        margin:10px;
        ">
      `;

      del.innerHTML += `
        <div style="
        display:flex;
        align-items:center;
        gap:15px;
        margin-bottom:20px;
        background:#111;
        padding:10px;
        border-radius:10px;
        ">

        <img src="${img}"
        style="
        width:80px;
        height:80px;
        object-fit:cover;
        border-radius:10px;
        ">

        <button onclick="
        deleteImage(
        '${category}',
        '${subcategory}',
        ${index}
        )
        "
        style="
        background:red;
        color:white;
        border:none;
        padding:10px 20px;
        cursor:pointer;
        border-radius:10px;
        ">
        DELETE IMAGE
        </button>

        </div>
      `;

    });

  });

});
// ================= DELETE IMAGE =================

function deleteImage(category,subcategory,index){

  pictureData[category][subcategory]
  .splice(index,1);

  localStorage.setItem(
    "pictureData",
    JSON.stringify(pictureData)
  );

  renderUploads();

  showSubCategory(category,subcategory);

  alert("Image Deleted");

}

window.deleteImage = deleteImage;

  // ================= VIDEOS =================

  Object.keys(videoData).forEach(category=>{

    videoData[category].forEach((video,index)=>{

      del.innerHTML += `
        <div style="
        display:flex;
        align-items:center;
        gap:15px;
        margin-bottom:20px;
        background:#111;
        padding:10px;
        border-radius:10px;
        ">

        <video
        src="${video}"
        muted
        autoplay
        loop
        style="
        width:120px;
        height:80px;
        object-fit:cover;
        border-radius:10px;
        ">
        </video>

        <button onclick="
        deleteVideo('${category}',${index})
        "
        style="
        background:red;
        color:white;
        border:none;
        padding:10px 20px;
        cursor:pointer;
        border-radius:10px;
        ">
        DELETE VIDEO
        </button>

        </div>
      `;

    });

  });

}
// ================= DELETE VIDEO =================

function deleteVideo(category,index){

  videoData[category].splice(index,1);

  localStorage.setItem(
    "videoData",
    JSON.stringify(videoData)
  );

  renderUploads();

  renderVideos();

  alert("Video Deleted");

}

window.deleteVideo = deleteVideo;
// ================= ABOUT SETTINGS =================

function updateAbout(){

  const value =
  document.getElementById("aboutInput")
  .value;

  document.querySelector(".about-text p")
  .innerText = value;

  alert("Updated Successfully");

}

window.updateAbout = updateAbout;

// ================= DEFAULT =================

showCategory("Wedding");

function toggleMobileMenu(){

  document
  .getElementById("navLinks")
  .classList.toggle("active");

}
window.toggleMobileMenu = toggleMobileMenu;
function openAdmin(){

   document.querySelectorAll(".page")
   .forEach(page=>{
     page.classList.remove("active");
   });

   document
   .getElementById("loginPage")
   .classList.add("active");

 }
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  if (email === "admin@gmail.com" && password === "663690") {
    alert("Login successful");
    showPage("dashboard");
  } else {
    alert("Wrong email or password");
  }
}

// make function global so HTML can access it
window.login = login;
window.showPage = showPage;
// ================= CATEGORY AUTO SLIDESHOW =================
// ================= CATEGORY AUTO SLIDESHOW =================

function startCategorySlides(){

  Object.keys(pictureData).forEach(category=>{

    const img =
    document.getElementById(
      `${category}Preview`
    );

    if(!img) return;

    let allImages = [];

    // collect uploaded images
    Object.keys(pictureData[category])
    .forEach(sub=>{

      allImages = [
        ...allImages,
        ...pictureData[category][sub]
      ];

    });

    // if no uploaded image
    if(allImages.length === 0) return;

    let index = 0;

    // show first uploaded image
    img.src = allImages[0];

    setInterval(()=>{

      index++;

      if(index >= allImages.length){
        index = 0;
      }

      // fade out
      img.style.opacity = 0;

      setTimeout(()=>{

        img.src = allImages[index];

        // fade in
        img.style.opacity = 1;

      },500);

    },5000);

  });

}

startCategorySlides();
renderUploads();
renderVideos();

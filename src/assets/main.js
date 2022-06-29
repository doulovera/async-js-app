const CHANNEL_ID = 'UC55-mxUj5Nj3niXFReG44OQ';
const BASE_URL = "https://apis.doulovera.com/api";

const API_VIDEOS = `${BASE_URL}/courses/async/videos?channelId=${CHANNEL_ID}`;
const API_CHANNEL = `${BASE_URL}/courses/async/channel?channelId=${CHANNEL_ID}`;

const content = null || document.getElementById('content');
const contentError = null || document.getElementById('content-error');

const channelTitle = null || document.getElementById('channel-title');
const channelDescription = null || document.getElementById('channel-description');
const channelThumbnail = null || document.getElementById('channel-image');

const options = {
  method: 'GET',
};

async function fetchAPI(urlApi) {
  const response = await fetch(urlApi, options);
  if (!response.ok) throw new Error(`${response.status} | Error fetching data`);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const channel = await fetchAPI(API_CHANNEL);
    const videos = await fetchAPI(API_VIDEOS);
    
    const { title, description, thumbnail } = channel?.data;

    channelTitle.innerHTML = title;
    channelDescription.innerHTML = description;
    channelThumbnail.innerHTML = `
      <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
      src="${thumbnail}" alt="${title}'s logo">
    `;

    const latestVideos = `
    ${videos?.data?.map((video) => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.thumbnail}" alt="${video.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.title}
          </h3>
        </div>
      </div>
    `).slice(0,4).join('')}
    `;

    content.innerHTML = latestVideos;
  } catch (err) {
    console.error(err);

    const error = `
      <div class="flex justify-center items-center flex-col gap-2 h-44 bg-red-100">
        <h1 class="text-3xl text-red-600">An error has ocurred...</h1>
        <p class="text-gray-600">...fetching the latest videos. This is the following error:</p>
        <p class="text-gray-600 font-bold">${err.message}</p>
      </div>
    `;

    contentError.innerHTML = error;
  }
})();

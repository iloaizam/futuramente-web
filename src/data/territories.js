import { resolveVideoUrl } from './externalVideoStorage.js';

const coverPath = (file) => `/assets/img/${file}`;

const mediaPath = (slug, kind, file) => `/assets/evidencias/${slug}/${kind}/${file}`;
const videoPath = (slug, file) => resolveVideoUrl(slug, file) || mediaPath(slug, 'videos', file);

const image = (slug, file, caption) => ({
  type: 'image',
  src: mediaPath(slug, 'imagenes', file),
  caption,
});

const video = (slug, file, caption, poster) => ({
  type: 'video',
  src: videoPath(slug, file),
  caption,
  ...(poster ? { poster } : {}),
});

function interleaveMedia(images, videos) {
  if (!videos.length) return images;

  const chunkSize = Math.ceil(images.length / (videos.length + 1));
  const result = [];
  let insertedVideos = 0;

  images.forEach((item, index) => {
    result.push(item);

    const reachedChunkEnd = (index + 1) % chunkSize === 0;
    if (reachedChunkEnd && videos[insertedVideos]) {
      result.push(videos[insertedVideos]);
      insertedVideos += 1;
    }
  });

  if (insertedVideos < videos.length) {
    result.push(...videos.slice(insertedVideos));
  }

  return result;
}

const amazonasPreviewEvidences = [
  image('amazonas', 'foto-01.jpeg'),
  image('amazonas', 'foto-02.jpeg'),
  image('amazonas', 'foto-03.jpeg'),
];

const amazonasImageFiles = [
  'Fotos (1).jpeg',
  'Fotos (6).jpeg',
  'Fotos (10).jpeg',
  'Fotos (13).jpeg',
  'Fotos (14).jpeg',
  'Fotos (19).jpeg',
  'Fotos (38).jpeg',
  'Fotos (39).jpeg',
  'Fotos (40).jpeg',
  'Fotos (51).jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.27 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.28 PM (2).jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.38 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.39 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.51 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.04.33 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.04.36 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.05.07 PM (1).jpeg',
  'WhatsApp Image 2025-11-25 at 2.05.10 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.05.24 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.06.38 PM.jpeg',
];

const amazonasVideoFiles = [
  'WhatsApp Video 2025-11-25 at 2.03.23 PM.mp4',
  'WhatsApp Video 2025-11-25 at 2.03.32 PM.mp4',
  'WhatsApp Video 2025-11-25 at 2.04.46 PM.mp4',
  'WhatsApp Video 2025-11-25 at 2.05.02 PM.mp4',
  'WhatsApp Video 2025-11-25 at 2.05.19 PM.mp4',
];

const amazonasVideoPosters = [
  'Fotos (13).jpeg',
  'Fotos (39).jpeg',
  'WhatsApp Image 2025-11-25 at 2.03.39 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.04.36 PM.jpeg',
  'WhatsApp Image 2025-11-25 at 2.06.38 PM.jpeg',
];

const amazonasImageEvidences = amazonasImageFiles.map((file) => image('amazonas', file));

const amazonasVideoEvidences = amazonasVideoFiles.map((file, index) =>
  video(
    'amazonas',
    file,
    undefined,
    mediaPath('amazonas', 'imagenes', amazonasVideoPosters[index])
  )
);

const amazonasEvidences = interleaveMedia(amazonasImageEvidences, amazonasVideoEvidences);

const atlanticoPreviewEvidences = [
  image('atlantico', 'foto-01.jpeg'),
  image('atlantico', 'foto-02.jpeg'),
  image('atlantico', 'foto-03.jpeg'),
];

const atlanticoImageFiles = [
  'Fotos (1).jpeg',
  'Fotos (2).jpeg',
  'Fotos (5).jpeg',
  'Fotos (6).jpeg',
  'Fotos (7).jpeg',
  'Fotos (8).jpeg',
  'Fotos (9).jpeg',
  'Fotos (10).jpeg',
  'Fotos (17).jpeg',
  'Fotos (18).jpeg',
  'Fotos (22).jpeg',
  'Fotos (30).jpeg',
  'Fotos (39).jpeg',
  'Fotos (40).jpeg',
  'Fotos (41).jpeg',
  'Fotos (43).jpeg',
  'Fotos (45).jpeg',
  'Fotos (46).jpeg',
  'Fotos (48).jpeg',
  'Fotos (64).jpeg',
  'Fotos (65).jpeg',
];

const atlanticoVideoFiles = [
  'Video (1).mp4',
  'Video (4).mp4',
  'Video (8).mp4',
  'Video (10).mp4',
  'Video (11).mp4',
  'Video (12).mp4',
];

const atlanticoVideoPosters = [
  'Fotos (17).jpeg',
  'Fotos (18).jpeg',
  'Fotos (39).jpeg',
  'Fotos (43).jpeg',
  'Fotos (48).jpeg',
  'Fotos (65).jpeg',
];

const atlanticoImageEvidences = atlanticoImageFiles.map((file) => image('atlantico', file));

const atlanticoVideoEvidences = atlanticoVideoFiles.map((file, index) =>
  video(
    'atlantico',
    file,
    undefined,
    mediaPath('atlantico', 'imagenes', atlanticoVideoPosters[index])
  )
);

const atlanticoEvidences = interleaveMedia(atlanticoImageEvidences, atlanticoVideoEvidences);

const vallePreviewEvidences = [
  image('valle-del-cauca', 'foto-01.jpeg'),
  image('valle-del-cauca', 'foto-02.jpeg'),
  image('valle-del-cauca', 'foto-03.jpeg'),
];

const valleImageFiles = [
  'Foto (1).jpeg',
  'Foto (3).jpeg',
  'Foto (7).jpeg',
  'Foto (20).jpeg',
  'Foto (31).jpeg',
  'Foto (34).jpeg',
  'Foto (39).jpeg',
  'Foto (42).jpeg',
  'Foto (51).jpeg',
  'Foto (57).jpeg',
  'Foto (61).jpeg',
  'Foto (63).jpeg',
  'Foto (64).jpeg',
  'Foto (67).jpeg',
  'Foto (70).jpeg',
  'Foto (73).jpeg',
  'Foto (87).jpeg',
  'Foto (89).jpeg',
  'Foto (90).jpeg',
  'Foto (96).jpeg',
  'Foto (97).jpeg',
  'Foto (98).jpeg',
];

const valleVideoFiles = [
  'Video (13).mp4',
  'Video (14).mp4',
  'Video (23).mp4',
  'Video (24).mp4',
  'Video (28).mp4',
];

const valleVideoPosters = [
  'Foto (34).jpeg',
  'Foto (42).jpeg',
  'Foto (64).jpeg',
  'Foto (89).jpeg',
  'Foto (98).jpeg',
];

const valleImageEvidences = valleImageFiles.map((file) => image('valle-del-cauca', file));

const valleVideoEvidences = valleVideoFiles.map((file, index) =>
  video(
    'valle-del-cauca',
    file,
    undefined,
    mediaPath('valle-del-cauca', 'imagenes', valleVideoPosters[index])
  )
);

const valleEvidences = interleaveMedia(valleImageEvidences, valleVideoEvidences);

const caldasPreviewEvidences = [
  image('caldas', 'foto-01.JPG'),
  image('caldas', 'foto-02.JPG'),
  image('caldas', 'foto-03.jpg'),
];

const caldasImageFiles = [
  'IMG_7087.JPG',
  'IMG_7093.JPG',
  'IMG_7100.JPG',
  'IMG_7123.JPG',
  'IMG_7131.jpg',
  'IMG_7135.JPG',
  'IMG_7139.JPG',
];

const caldasVideoFiles = [
  'VídeoGeneral.mp4',
  'IMG_7182.MOV',
  'IMG_7184.MOV',
  'IMG_7186.MOV',
  'IMG_7187.MOV',
];

const caldasVideoPosters = [
  'IMG_7123.JPG',
  'IMG_7131.jpg',
  'IMG_7135.JPG',
  'IMG_7139.JPG',
  'IMG_7100.JPG',
];

const caldasImageEvidences = caldasImageFiles.map((file) => image('caldas', file));

const caldasVideoEvidences = caldasVideoFiles.map((file, index) =>
  video(
    'caldas',
    file,
    undefined,
    mediaPath('caldas', 'imagenes', caldasVideoPosters[index])
  )
);

const caldasEvidences = interleaveMedia(caldasImageEvidences, caldasVideoEvidences);

const araucaPreviewEvidences = [
  image('arauca', 'foto-01.JPG'),
  image('arauca', 'foto-02.JPG'),
  image('arauca', 'foto-03.JPG'),
];

const araucaImageFiles = [
  'DSC_0004.JPG',
  'DSC_0007.JPG',
  'DSC_0050.JPG',
  'DSC_0082.JPG',
  '_DSC0212.JPG',
  '_DSC0214.JPG',
  '_DSC0218.JPG',
  '_DSC0220.JPG',
  '_DSC0221.JPG',
  '_DSC0236.JPG',
  '_DSC0246.JPG',
  '_DSC0248.JPG',
  '_DSC0251.JPG',
  '_DSC0255.JPG',
  '_DSC0256.JPG',
  '_DSC0265.JPG',
  '_DSC0268.JPG',
  '_DSC0270.JPG',
  '_DSC0272.JPG',
  '_DSC0273.JPG',
  '_DSC0279.JPG',
  '_DSC0285.JPG',
  '_DSC0288.JPG',
  '_DSC0291.JPG',
  '_DSC0294.JPG',
  '_DSC0299.JPG',
  '_DSC0301.JPG',
  '_DSC0303.JPG',
  '_DSC0306.JPG',
  '_DSC0308.JPG',
  '_DSC0311.JPG',
  '_DSC0313.JPG',
  '_DSC0315.JPG',
  '_DSC0318.JPG',
  '_DSC0321.JPG',
  '_DSC0324.JPG',
  '_DSC0330.JPG',
  '_DSC0334.JPG',
  '_DSC0338.JPG',
  '_DSC0346.JPG',
  '_DSC0354.JPG',
];

const araucaVideoFiles = [
  'VID_20251114_080359.mp4',
  'VID_20251114_080801.mp4',
  'VID_20251114_082920.mp4',
  'VID_20251114_083052.mp4',
  'VID_20251114_100923.mp4',
];

const araucaVideoPosters = [
  '_DSC0248.JPG',
  '_DSC0268.JPG',
  '_DSC0291.JPG',
  '_DSC0321.JPG',
  '_DSC0354.JPG',
];

const araucaImageEvidences = araucaImageFiles.map((file) => image('arauca', file));

const araucaVideoEvidences = araucaVideoFiles.map((file, index) =>
  video(
    'arauca',
    file,
    undefined,
    mediaPath('arauca', 'imagenes', araucaVideoPosters[index])
  )
);

const araucaEvidences = interleaveMedia(araucaImageEvidences, araucaVideoEvidences);

const cundinamarcaPreviewEvidences = [
  image('cundinamarca', 'foto-01.jpg'),
  image('cundinamarca', 'foto-02.jpg'),
  image('cundinamarca', 'foto-03.jpg'),
];

const cundinamarcaImageFiles = [
  'IMG_6685.JPG',
  'IMG_6686.JPG',
  'IMG_6735.JPG',
  'IMG_6737.JPG',
  'IMG_6745.JPG',
  'IMG_6747.JPG',
  'IMG_6751.JPG',
  'IMG_6759.JPG',
  'IMG_6760.JPG',
  'IMG_6761.JPG',
  'IMG_6764.jpg',
  'IMG_6766.jpg',
  'IMG_6768.jpg',
  'IMG_6771.jpg',
  'IMG_6775.jpg',
  'IMG_6776.jpg',
  'IMG_6777.jpg',
  'IMG_6784.jpg',
  'IMG_6785.jpg',
  'IMG_6787.JPG',
  'IMG_6789.jpg',
  'IMG_6795.jpg',
  'IMG_6797.JPG',
  'IMG_6801.jpg',
  'IMG_6804.JPG',
  'IMG_6816.JPG',
  'IMG_6823.JPG',
];

const cundinamarcaVideoFiles = [
  'DJI_20251017104722_0541_D.MP4',
  'DJI_20251017105326_0542_D.MP4',
  'DJI_20251017105342_0543_D.MP4',
  'DJI_20251017105406_0544_D.MP4',
  'DJI_20251017105621_0546_D.MP4',
  'DJI_20251017110356_0547_D.MP4',
  'DJI_20251017110535_0548_D.MP4',
  'DJI_20251017114425_0549_D.MP4',
  'DJI_20251017115347_0552_D.MP4',
  'DJI_20251017115433_0554_D.MP4',
  'DJI_20251017115551_0556_D.MP4',
  'DJI_20251017115655_0557_D.MP4',
  'IMG_6746.MOV',
  'IMG_6756.MOV',
];

const cundinamarcaVideoPosters = [
  'IMG_6735.JPG',
  'IMG_6745.JPG',
  'IMG_6751.JPG',
  'IMG_6759.JPG',
  'IMG_6761.JPG',
  'IMG_6766.jpg',
  'IMG_6771.jpg',
  'IMG_6777.jpg',
  'IMG_6785.jpg',
  'IMG_6789.jpg',
  'IMG_6797.JPG',
  'IMG_6804.JPG',
  'IMG_6816.JPG',
  'IMG_6823.JPG',
];

const cundinamarcaImageEvidences = cundinamarcaImageFiles.map((file) => image('cundinamarca', file));

const cundinamarcaVideoEvidences = cundinamarcaVideoFiles.map((file, index) =>
  video(
    'cundinamarca',
    file,
    undefined,
    mediaPath('cundinamarca', 'imagenes', cundinamarcaVideoPosters[index])
  )
);

const cundinamarcaEvidences = interleaveMedia(cundinamarcaImageEvidences, cundinamarcaVideoEvidences);

const tolimaImageFiles = [
  'IMG_4755.JPG',
  'IMG_4761.JPG',
  'IMG_4800.JPG',
  'IMG_4802.JPG',
  'IMG_4803.JPG',
  'IMG_4807.JPG',
  'IMG_4808.JPG',
  'IMG_4811.JPG',
  'IMG_4816.JPG',
  'IMG_4826.JPG',
  'IMG_4827.JPG',
  'IMG_4830.jpg',
  'IMG_4845.jpg',
  'IMG_4848.JPG',
  'IMG_4861.jpg',
  'IMG_4863.jpg',
  'IMG_4865.jpg',
  'IMG_4875.JPG',
  'IMG_4877.JPG',
  'IMG_4887.JPG',
  'IMG_4892.jpg',
  'IMG_4901.jpg',
  'IMG_4904.jpg',
  'IMG_4908.jpg',
  'IMG_4910.JPG',
  'IMG_4911.JPG',
  'IMG_4913.jpg',
  'IMG_4914.jpg',
  'IMG_4917.jpg',
  'IMG_4919.JPG',
  'IMG_4921.JPG',
  'IMG_4924.JPG',
  'IMG_4927.jpg',
  'IMG_4932.jpg',
  'IMG_4933.jpg',
  'IMG_4936.jpg',
  'IMG_4938.jpg',
  'IMG_4939.JPG',
  'IMG_4942.jpg',
  'IMG_4944.jpg',
  'IMG_4946.jpg',
  'IMG_4947.jpg',
  'IMG_4948.JPG',
  'IMG_4949.JPG',
  'IMG_4952.jpg',
  'IMG_4953.jpg',
  'IMG_4957.jpg',
  'IMG_4960.jpg',
  'IMG_4961.jpg',
  'IMG_4964.jpg',
  'IMG_4971.jpg',
  'IMG_4973.jpg',
  'IMG_4976.jpg',
  'IMG_4977.jpg',
  'IMG_4978.JPG',
  'IMG_4981.jpg',
];

const tolimaVideoFiles = [
  'DJI_20250822095655_0008_D.MP4',
  'DJI_20250822105751_0022_D.MP4',
  'DJI_20250822111250_0030_D.MP4',
  'DJI_20250822113051_0031_D.MP4',
];

const tolimaVideoPosters = ['IMG_4919.JPG', 'IMG_4924.JPG', 'IMG_4948.JPG', 'IMG_4981.jpg'];
const tolimaPreviewEvidences = [
  image('tolima', 'foto-01.JPG'),
  image('tolima', 'foto-02.jpg'),
  image('tolima', 'foto-03.jpg'),
  image('tolima', 'foto-04.JPG'),
];

const tolimaImageEvidences = tolimaImageFiles.map((file) => image('tolima', file));

const tolimaVideoEvidences = tolimaVideoFiles.map((file, index) =>
  video(
    'tolima',
    file,
    undefined,
    mediaPath('tolima', 'imagenes', tolimaVideoPosters[index])
  )
);

const tolimaEvidences = interleaveMedia(tolimaImageEvidences, tolimaVideoEvidences);

export const territories = [
  {
    key: 'amazonas',
    slug: 'amazonas',
    name: 'Amazonas',
    color: '#85c536',
    visited: true,
    cover: coverPath('cover-amazonas.jpg'),
    previewEvidences: amazonasPreviewEvidences,
    evidences: amazonasEvidences,
  },
  {
    key: 'arauca',
    slug: 'arauca',
    name: 'Arauca',
    color: '#3871c1',
    visited: true,
    cover: coverPath('cover-arauca.jpg'),
    previewEvidences: araucaPreviewEvidences,
    evidences: araucaEvidences,
  },
  {
    key: 'atlantico',
    slug: 'atlantico',
    name: 'Atlántico',
    color: '#4ed5db',
    visited: true,
    cover: coverPath('cover-atlantico.avif'),
    previewEvidences: atlanticoPreviewEvidences,
    evidences: atlanticoEvidences,
  },
  {
    key: 'caldas',
    slug: 'caldas',
    name: 'Caldas',
    color: '#51b59f',
    visited: true,
    cover: coverPath('cover-caldas.avif'),
    previewEvidences: caldasPreviewEvidences,
    evidences: caldasEvidences,
  },
  {
    key: 'cundinamarca',
    slug: 'cundinamarca',
    name: 'Cundinamarca',
    color: '#ec058e',
    visited: true,
    cover: coverPath('cover-cundinamarca.jpg'),
    previewEvidences: cundinamarcaPreviewEvidences,
    evidences: cundinamarcaEvidences,
  },
  {
    key: 'tolima',
    slug: 'tolima',
    name: 'Tolima',
    color: '#98198e',
    visited: true,
    cover: coverPath('cover-tolima.jpg'),
    previewEvidences: tolimaPreviewEvidences,
    evidences: tolimaEvidences,
  },
  {
    key: 'valle-del-cauca',
    slug: 'valle-del-cauca',
    name: 'Valle del Cauca',
    color: '#ffbd59',
    visited: true,
    cover: coverPath('cover-valle.webp'),
    previewEvidences: vallePreviewEvidences,
    evidences: valleEvidences,
  },
];

export const supportedEvidenceTypes = ['image', 'video'];

export const evidenceFactories = {
  image,
  video,
};

export function getTerritoryByName(name) {
  const normalized = (name || '').trim().toLowerCase();
  return territories.find((territory) => territory.name.toLowerCase() === normalized);
}

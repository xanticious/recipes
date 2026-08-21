export type RestaurantPhotoSource = "streetview";

export type RestaurantPhoto = {
  photographer: string;
  creditUrl: string;
  source: RestaurantPhotoSource;
};

export const RESTAURANT_PHOTO_SOURCE_LABELS: Record<RestaurantPhotoSource, string> = {
  streetview: "Street View",
};

/** Filled by `scripts/fetch-restaurant-photos.ts` when a storefront photo is saved. */
export const RESTAURANT_PHOTOS: Readonly<Record<string, RestaurantPhoto>> = {
  "annies-cafe-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=AkEieHrMdYC80QtpSGYmKQ&heading=351&pitch=8&fov=80",
    source: "streetview",
  },
  "arella-pizzeria-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=Atxz_hRdQrcaXWnYyeiqFQ&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "bartolos-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=vQXfqzhvMuXPUrAizULaXg&heading=221&pitch=8&fov=80",
    source: "streetview",
  },
  "black-bear-diner-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=H1yWIKWVzJZYiQ6QIEphHA&heading=183&pitch=8&fov=80",
    source: "streetview",
  },
  "blaze-pizza-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uDPAZraaQYptjKJH4CiaVQ&heading=263&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-rio-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=usps3x7MeZVO6rl8BNjWFQ&heading=98&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-rio-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=KNOoVdbVc9QyFn2Vz2jlSA&heading=53&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-rio-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=k8Nl3__NUp9feCpdCgwPTA&heading=167&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-sabor-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=4j_Mgzv6vxE5FzO9qgR1eA&heading=229&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-zupas-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=qBwIv3Fcz_fwlFNS_jrLAA&heading=34&pitch=8&fov=80",
    source: "streetview",
  },
  "cafe-zupas-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=ELnStuyo011wHTfNifwnPA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "changs-chopstix-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=w7i3bzwosFN64AEYK2bN2g&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "chilis-centerville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=kJYRT2V6sWEqcqbcohbr-g&heading=171&pitch=8&fov=80",
    source: "streetview",
  },
  "chilis-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=-EVd9yolYXmJcfo6ODqhFw&heading=351&pitch=8&fov=80",
    source: "streetview",
  },
  "china-platter-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=LCRoGaPABavwdVWmN6PbYQ&heading=8&pitch=8&fov=80",
    source: "streetview",
  },
  "china-star-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=MiIBDqQwIuI9VkMQ1koRnw&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "chipotle-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=DKH_tbhwrL-PZ_Z_rttRZQ&heading=236&pitch=8&fov=80",
    source: "streetview",
  },
  "chipotle-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=ZMw8s-RM_7771TiQJefSIw&heading=178&pitch=8&fov=80",
    source: "streetview",
  },
  "chonchis-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=yUc0Rm7E2ZdpvYiKz-SSDA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "chuck-a-rama-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=NdTLRrb0z2IyezUHR7aIzQ&heading=84&pitch=8&fov=80",
    source: "streetview",
  },
  "costa-vida-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=CAoSFkNJSE0wb2dLRUlDQWdJREUtN09fVlE.&heading=13&pitch=8&fov=80",
    source: "streetview",
  },
  "costa-vida-centerville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=-24DXrAXKy0j8CwWzBcUZA&heading=353&pitch=8&fov=80",
    source: "streetview",
  },
  "costa-vida-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=AtNMECTVU7iuP0qxFlZSUw&heading=301&pitch=8&fov=80",
    source: "streetview",
  },
  "costa-vida-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=XBufgyRlYUcFEoJoZpBNlA&heading=9&pitch=8&fov=80",
    source: "streetview",
  },
  "costa-vida-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=t6glY41TZhYcgoQQUMvfiQ&heading=3&pitch=8&fov=80",
    source: "streetview",
  },
  "cubbys-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=n_Iq0WKvfMy9IUnrp-7eTQ&heading=284&pitch=8&fov=80",
    source: "streetview",
  },
  "culvers-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=FTN3l75lj3jEmb_LcuAGiQ&heading=96&pitch=8&fov=80",
    source: "streetview",
  },
  "culvers-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=GeP5kYvuV4jYktngKZwrUQ&heading=91&pitch=8&fov=80",
    source: "streetview",
  },
  "el-dorado-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=ntXsvpI_y7I0QiRRWw7lWg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "el-matador-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=pOttXnbYH-8RQ2-1IfSWpQ&heading=281&pitch=8&fov=80",
    source: "streetview",
  },
  "el-rocoto-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=6US5yuNjf7eW-QfxvPzbJQ&heading=357&pitch=8&fov=80",
    source: "streetview",
  },
  "empire-chinese-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=hqlEkdYOmNOc6q6fHxKcJQ&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "fat-fish-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=Mrujb3cVhguDbwU0FZiYDg&heading=78&pitch=8&fov=80",
    source: "streetview",
  },
  "fort-indian-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=9ooc8HSggNva8NF4tduOTg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "franciscos-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=JYSo6IbPRTlcfy_ITm8Nxg&heading=90&pitch=8&fov=80",
    source: "streetview",
  },
  "golden-corral-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=-aC0TrLRDDzssXjAtS3LQQ&heading=316&pitch=8&fov=80",
    source: "streetview",
  },
  "great-harvest-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=UiPYRpTg-LF9G9xjMVAp8w&heading=355&pitch=8&fov=80",
    source: "streetview",
  },
  "hug-hes-centerville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uY7mULxoaPqs-vRXh6_B3Q&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "javiers-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=sSqelGiIN-g-NTytq7GqWQ&heading=273&pitch=8&fov=80",
    source: "streetview",
  },
  "johnny-rockets-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=9BLAuFSPwMKqrpeJnywzNg&heading=207&pitch=8&fov=80",
    source: "streetview",
  },
  "kitchen-88-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=GTEjCrSIejGLwYalnIs-qA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "kneaders-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uklorAcM2q-acgB-C4agpg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "kneaders-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=GuG9PZ4-HTUmwDfCYJDaKg&heading=96&pitch=8&fov=80",
    source: "streetview",
  },
  "kneaders-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uNSKeWeM3SDI5UYF5ziH1g&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "las-flores-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=UCwS4tgQP4STuqUOy6mdbw&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "legers-deli-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=OV1gqZu8doQ5G2DWo1eqzg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "little-taste-of-britain-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=pAudNsBCVy4iNgjbbG_aHg&heading=173&pitch=8&fov=80",
    source: "streetview",
  },
  "lorenas-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=jiZBq_UTcv5lLTMs-byigg&heading=95&pitch=8&fov=80",
    source: "streetview",
  },
  "mandarin-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=tbuJyXpadjclKs-sG3ZH-Q&heading=174&pitch=8&fov=80",
    source: "streetview",
  },
  "marcellos-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=8vTJefcXehniCue1NHl9eQ&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "mo-bettahs-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=E4Ljk31-38rLsImEoMYwSA&heading=264&pitch=8&fov=80",
    source: "streetview",
  },
  "mo-bettahs-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=5iJvzdmlyDQQazLNNcb9rA&heading=294&pitch=8&fov=80",
    source: "streetview",
  },
  "mo-bettahs-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=IHP1yInPLBq2KYW9p0d28g&heading=105&pitch=8&fov=80",
    source: "streetview",
  },
  "mod-pizza-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=a5YVrhR2JabWJ_rgzSVH0Q&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "mod-pizza-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=x9UQN8G-D82e1jf-l6OrQQ&heading=240&pitch=8&fov=80",
    source: "streetview",
  },
  "nacho-house-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=5CvVdY_VYwd4GvUAIh9mTA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "nikko-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=MpUtE21j4w1LQaaU9cgWZQ&heading=274&pitch=8&fov=80",
    source: "streetview",
  },
  "no-1-thai-fusion-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=HhxXdjt3ZlNpy609-cDQhQ&heading=317&pitch=8&fov=80",
    source: "streetview",
  },
  "oka-ramen-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=FJ8t5RnBg65eSYwDdxNLww&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "orlandos-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=WgsOv0tNIAofXnVHXaYpHg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "our-kitchen-cafe-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uQ-rN3b9fTHh6-IbT6AbSA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "panda-express-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=SQIt_zLWzIyK46tXY1GnXA&heading=76&pitch=8&fov=80",
    source: "streetview",
  },
  "panda-express-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=PlGswr0i-TBgtSo4i3teFA&heading=203&pitch=8&fov=80",
    source: "streetview",
  },
  "panda-express-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=J_rv9NJ3ZdrAIC2j4eMwQg&heading=14&pitch=8&fov=80",
    source: "streetview",
  },
  "penny-anns-cafe-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=Pi3eqwzTPWlc3E2bvXM86A&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "pf-changs-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=4_BKaVRT20vyz7SgIf-qCQ&heading=123&pitch=8&fov=80",
    source: "streetview",
  },
  "plated-dreams-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=dPT7ywEGpFOrj-IwXL7TRA&heading=302&pitch=8&fov=80",
    source: "streetview",
  },
  "plates-and-palates-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=CAoSF0NJSE0wb2dLRUlDQWdJQzRrdTNEendF&heading=53&pitch=8&fov=80",
    source: "streetview",
  },
  "r-and-r-bbq-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=elNZfMCxgQV4H7Vh-Dby1g&heading=355&pitch=8&fov=80",
    source: "streetview",
  },
  "ramblin-roads-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uiyUxjfjinq7CfNpcHC6Dw&heading=351&pitch=8&fov=80",
    source: "streetview",
  },
  "ramblin-roads-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=klEfIEayl1xHpFX0oMHQZQ&heading=117&pitch=8&fov=80",
    source: "streetview",
  },
  "rancheritos-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=O6bDfFPjQtSDCEPFNwoXJg&heading=151&pitch=8&fov=80",
    source: "streetview",
  },
  "rancheritos-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=4rrJaa7VJNpA6qFaWd_ykA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "royal-india-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=EZQXgbSe7C8yYm9ykC_VqQ&heading=261&pitch=8&fov=80",
    source: "streetview",
  },
  "rumbi-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=1e4LMeeSjTCRzbo1utMWPQ&heading=84&pitch=8&fov=80",
    source: "streetview",
  },
  "rumbi-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=xsHL-2aMAtEgoihe9B0mmw&heading=161&pitch=8&fov=80",
    source: "streetview",
  },
  "santorinis-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=XXTesA9l6tKlArmeHwVFmA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "sills-cafe-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=LlE0VmXOPYm4CQ8r-iUQFg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "smokin-bones-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=SYTZ-oorywDIk1AT_q90qQ&heading=268&pitch=8&fov=80",
    source: "streetview",
  },
  "sticky-bird-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=pOS0vZDZpaX3jjFZgGOZ7g&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "sukihana-nsl": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=Iw5ZSeWbznz3Y674fLkskw&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "sushi-monster-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=uXx-WF5rviAYkGNk5GAgFg&heading=131&pitch=8&fov=80",
    source: "streetview",
  },
  "taste-of-india-grill-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=0LPBQG4iJ9CO6cF045vx2Q&heading=6&pitch=8&fov=80",
    source: "streetview",
  },
  "texas-roadhouse-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=X9GY5Nn4_PdiU1_Hip5U1w&heading=86&pitch=8&fov=80",
    source: "streetview",
  },
  "texas-roadhouse-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=QLl_VRRmVo_WggX9RVwOww&heading=19&pitch=8&fov=80",
    source: "streetview",
  },
  "thai-in-town-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=UdAwt75MuSvYQXhMIpynOQ&heading=164&pitch=8&fov=80",
    source: "streetview",
  },
  "the-coop-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=By7uieg5YWLTofd-PREHIw&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "thyme-and-seasons-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=7M0FoUnibLuqHxMPxuKimA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "ti-amo-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=QU4Pwemg11mTPq0lcoDRKA&heading=89&pitch=8&fov=80",
    source: "streetview",
  },
  "tonyburgers-centerville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=oUcdze0hQQwQuk2TEQHaTw&heading=86&pitch=8&fov=80",
    source: "streetview",
  },
  "tucanos-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=SumC9fTGz-2kyAzGAU_ltg&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "twigs-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=wZA7cQxiLJng-S1xtvTOMQ&heading=277&pitch=8&fov=80",
    source: "streetview",
  },
  "vessel-kitchen-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=CAoSF0NJSE0wb2dLRUlDQWdJQ0V4OHlWOGdF&heading=79&pitch=8&fov=80",
    source: "streetview",
  },
  "vitos-bountiful": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=F0BRxzgSTBM4_8I0nY97zg&heading=165&pitch=8&fov=80",
    source: "streetview",
  },
  "w-thai-chef-kaysville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=NZJlIyMVHu0OkQYo6ZXxIA&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "waffled-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=drQPNny8tTXyiu24oCZvgg&heading=250&pitch=8&fov=80",
    source: "streetview",
  },
  "wellers-bistro-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=rFNC9ajAzt9kYgri_iOq5A&heading=81&pitch=8&fov=80",
    source: "streetview",
  },
  "z-brothers-pizza-centerville": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=u1Nl3Yn0E5jFEMao0JmpFQ&heading=0&pitch=8&fov=80",
    source: "streetview",
  },
  "zao-farmington": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=3gRhPgwDN2h7BjYbpV4rzw&heading=326&pitch=8&fov=80",
    source: "streetview",
  },
  "zao-layton": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=BfOHy_N9MD-3wNIbjOpEGA&heading=149&pitch=8&fov=80",
    source: "streetview",
  },
  "zao-woods-cross": {
    photographer: "Google",
    creditUrl:
      "https://www.google.com/maps/@?api=1&map_action=pano&pano=CfEPF7BPuSkeUFuX6vDKpQ&heading=273&pitch=8&fov=80",
    source: "streetview",
  },
};

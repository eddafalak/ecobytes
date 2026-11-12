// Loads the sample content (homepage, about page and three articles) into Prismic with the
// Migration API. Run it once after pushing the types with Slice Machine:
//
//   npm run seed
//
// It needs PRISMIC_WRITE_TOKEN in .env.local (Prismic → Settings → API & Security → Write APIs).
// The documents land in a "Migration release" in Prismic: open it, add images, and publish.
import * as prismic from "@prismicio/client";
import config from "../slicemachine.config.json" with { type: "json" };

const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (!writeToken) {
  console.error("Missing PRISMIC_WRITE_TOKEN. Add it to .env.local (see .env.example).");
  process.exit(1);
}

const client = prismic.createWriteClient(config.repositoryName, { writeToken });
// Documents are created in the repository's main language (en-us unless you changed it).
const lang = (await client.getRepository()).languages[0].id;

// ---------- Small helpers to write rich text without hand-writing Prismic's JSON ----------
const node = (type) => (text) => ({ type, text, spans: [] });
const p = node("paragraph");
const h2 = node("heading2");
const h3 = node("heading3");
const li = node("list-item");
const heading1 = (text) => [node("heading1")(text)];

const slice = (slice_type, primary) => ({ slice_type, variation: "default", primary, items: [] });
const text = (...blocks) => slice("text", { text: blocks });
const quote = (quote, source) => slice("quote", { quote, source });
const embed = (url, caption) => slice("embed", { embed: { embed_url: url }, caption });

const empty = { meta_title: null, meta_description: null, meta_image: {} };

// ---------- Content ----------
const home = {
  type: "home",
  lang,
  data: {
    headline: heading1("Technology that’s good for the planet."),
    intro:
      "EcoBytes explores the meeting point of technology and sustainability: greener computing, gadgets built to last, and the trends shaping a lower-carbon future.",
    hero_image: {},
    ...empty,
  },
};

const about = {
  type: "about",
  lang,
  data: {
    title: heading1("About EcoBytes"),
    intro: "We believe technology can be part of the solution to the climate crisis, if we build and use it wisely.",
    image: {},
    slices: [
      text(
        h2("Our mission"),
        p("EcoBytes is a small blog for tech enthusiasts and environmental advocates alike. We explain how technology affects the planet, both the problems it creates and the solutions it makes possible, in clear language without the hype."),
        p("Every article looks at a real technology or trend: how it works, what difference it makes, and what you can do with it."),
        h2("Why sustainable technology matters"),
        p("Our devices, networks and data centres use a large and growing amount of energy and raw materials, and electronic waste is the fastest-growing waste stream in the world. At the same time, technology is behind many of the tools we need to cut emissions: renewable energy, smart grids, efficient buildings and better ways to repair and reuse what we already own."),
        p("Sustainable technology is about getting the benefits without the hidden costs: designing products to last, powering them with clean energy, and keeping materials in use for as long as possible."),
        h2("What we write about"),
        li("Green computing: energy-efficient software, hardware and data centres."),
        li("Eco-friendly gadgets: devices designed to be repaired, upgraded and recycled."),
        li("Sustainable tech trends: the bigger shifts, from e-waste to the energy transition."),
      ),
      quote("The greenest device is the one you already own.", "A good rule of thumb before buying anything new"),
    ],
    ...empty,
  },
};

const articles = [
  {
    uid: "how-data-centres-are-going-green",
    data: {
      title: heading1("How data centres are going green"),
      summary:
        "Every search, stream and AI prompt runs in a data centre somewhere. Here’s how the industry is cutting the energy and water those buildings use.",
      publication_date: "2026-10-20",
      category: "Green computing",
      author: "EcoBytes team",
      featured: true,
      featured_image: {},
      slices: [
        text(
          p("Data centres are the factories of the internet. They store our photos, run our apps and, increasingly, train and serve AI models. All of that takes electricity, both to run the servers and to keep them cool, and demand is growing fast."),
          h2("Measuring efficiency"),
          p("The industry’s best-known yardstick is Power Usage Effectiveness (PUE): the total energy a data centre uses divided by the energy that actually reaches the computers. A PUE of 2.0 means that for every watt of computing, another watt goes to cooling, lighting and power conversion. The most efficient modern facilities get close to 1.1."),
          h2("Cooler ways to keep cool"),
          p("Cooling is the biggest overhead, so that’s where much of the innovation is happening:"),
          li("Free-air cooling: in cold climates, outside air does most of the work. It’s one reason Iceland and the Nordic countries attract data centres, along with their renewable electricity."),
          li("Liquid cooling: pumping liquid directly to the chips moves heat far more efficiently than air, which matters for power-hungry AI hardware."),
          li("Heat reuse: instead of being wasted, the heat from servers can warm nearby homes and offices through district heating networks."),
        ),
        embed("https://www.youtube.com/watch?v=lBeepqQBpvU", "Microsoft’s Project Natick tested an underwater data centre off the coast of Scotland."),
        text(
          h2("An experiment under the sea"),
          p("Microsoft’s Project Natick took the idea of free cooling to the extreme: a sealed data centre on the seabed, cooled by the surrounding water. When the module was brought back up after two years, its servers had failed far less often than comparable ones on land, which the team put down partly to the stable, oxygen-free environment. The project was an experiment rather than a product, but its lessons about reliability and cooling are being applied elsewhere."),
          h2("Clean power matters most"),
          p("Efficiency only goes so far: a perfectly efficient data centre running on coal still has a large footprint. That’s why the largest operators are signing long-term contracts for wind, solar and geothermal power, and why where a data centre is built matters as much as how."),
          h3("What you can do"),
          li("Delete files and old backups you don’t need; storage isn’t free for the planet."),
          li("Stream at the resolution your screen actually shows."),
          li("Choose hosting providers that publish their energy sources and efficiency figures."),
        ),
      ],
      ...empty,
    },
  },
  {
    uid: "repairable-gadgets",
    data: {
      title: heading1("Built to be fixed: the rise of repairable gadgets"),
      summary:
        "Phones and laptops you can open with a screwdriver are back. Why repairability is one of the most effective ways to cut the footprint of our electronics.",
      publication_date: "2026-10-28",
      category: "Eco-friendly gadgets",
      author: "EcoBytes team",
      featured: true,
      featured_image: {},
      slices: [
        text(
          p("Most of the carbon footprint of a smartphone or laptop comes from making it, not from charging it. Mining the metals, manufacturing the chips and shipping the finished device all happen before you switch it on for the first time. That means the single best thing you can do for the planet is to keep your devices working for longer."),
          h2("Designed for the screwdriver"),
          p("A new wave of companies is designing gadgets to be opened, repaired and upgraded by their owners:"),
          li("Modular phones with replaceable batteries, screens and cameras, sold with spare parts and repair guides."),
          li("Laptops where the memory, storage, ports and even the mainboard can be swapped out, so the machine can be upgraded instead of replaced."),
          li("Repair guides and spare-part shops that make fixing a cracked screen a 15-minute job at the kitchen table."),
        ),
        quote("If you can’t fix it, you don’t own it.", "A popular slogan of the right-to-repair movement"),
        text(
          h2("The law is catching up"),
          p("Repairability is no longer just a niche selling point. In the European Union, a common USB-C charger became mandatory for phones and many other devices at the end of 2024, so fewer chargers end up in drawers and landfill. New EU rules also require that batteries in portable devices become easier for users to remove and replace, and right-to-repair rules oblige manufacturers to offer repairs and spare parts for years after a product is sold."),
          h2("How to choose a gadget that lasts"),
          li("Check the repairability score where it’s available, or look up teardown reviews before you buy."),
          li("Look for a long software-update promise: a phone without security updates is often retired while the hardware still works."),
          li("Buy refurbished: a second-life device avoids almost all of the manufacturing footprint."),
          li("When it’s finally time to let go, sell it, donate it or recycle it properly."),
        ),
      ],
      ...empty,
    },
  },
  {
    uid: "the-e-waste-problem",
    data: {
      title: heading1("E-waste: the fastest-growing waste stream on Earth"),
      summary:
        "The world throws away more electronics every year than ever before, and most of it is never properly recycled. What happens to our old devices, and how technology can help.",
      publication_date: "2026-11-05",
      category: "Sustainable tech trends",
      author: "EcoBytes team",
      featured: true,
      featured_image: {},
      slices: [
        text(
          p("Old phones in a drawer, a broken kettle, a laptop that no longer charges: anything with a plug or a battery becomes electronic waste, or e-waste, when we throw it away. According to the UN’s Global E-waste Monitor 2024, the world generated a record 62 million tonnes of e-waste in 2022, and less than a quarter of it was documented as properly collected and recycled."),
          h2("Why it matters"),
          p("E-waste is both a pollution problem and a lost opportunity. Electronics contain hazardous substances like lead and mercury that can leak into soil and water when devices are dumped or burned. They also contain valuable materials, such as copper, gold, cobalt and rare earth elements, that otherwise have to be mined from new."),
          h2("Technology to the rescue"),
          li("Urban mining: specialised recycling plants recover metals from old circuit boards and batteries, often with less energy than mining raw ore."),
          li("Robots that disassemble: some manufacturers use robots to take returned phones apart and sort the components for reuse and recycling."),
          li("Digital product passports: the EU is introducing digital records for products, including batteries, that tell repairers and recyclers what a product is made of and how to take it apart."),
          li("Take-back schemes: retailers and manufacturers increasingly collect old devices for refurbishment or recycling."),
          h2("What you can do"),
          p("The most sustainable option is to use what you have for longer and repair before replacing. When a device really is at the end of its life, take it to a recycling point or a take-back scheme rather than the bin, and wipe your data first. If it still works, someone else may be happy to give it a second life."),
        ),
        quote("There is no ‘away’ when we throw things away.", "A reminder that every device ends up somewhere"),
      ],
      ...empty,
    },
  },
];

// ---------- Migrate ----------
const migration = prismic.createMigration();

migration.createDocument(home, "Homepage");
migration.createDocument(about, "About page");
for (const article of articles) {
  migration.createDocument({ type: "article", lang, ...article }, article.data.title[0].text);
}

await client.migrate(migration, {
  reporter: (event) => {
    if (event.type === "documents:creating") console.log(`Creating ${event.data.current}/${event.data.total}: ${event.data.document.title}`);
    if (event.type === "end") console.log("Done. Open the Migration release in Prismic to add images and publish.");
  },
});

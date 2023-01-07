import urlMetadata from "url-metadata";
import slugify from "slugify";
import fs from "fs/promises";
import path from "path";
import { dump } from "js-yaml";
import rootPath from "~/utils/rootPath";

const execute = async (
  url: string,
  category: string,
  group: string,
  name?: string,
  fileName?: string
) => {
  const urlWithoutwww = url.replace("www.", "").replace("www.", "");

  let result = {} as urlMetadata.Result | null;
  try {
    result = await urlMetadata(urlWithoutwww);
  } catch (err: any) {
    console.log("Error fetching metadata for url: ", urlWithoutwww, err);
    if (err.Error === "response code 403") {
      result = {} as urlMetadata.Result;
    } else {
      result = null;
    }
  }
  if (!result) return;

  let root = result.url || result["og:url"] || urlWithoutwww;
  let href = urlWithoutwww;
  let host = root;
  let origin = urlWithoutwww;
  let pathname = "";
  let search = "";

  try {
    const u = new URL(urlWithoutwww);
    host = u.host;
    root = host.replace(/\.[^/.]+$/, "").replaceAll(/\./g, " ");
    href = u.href;
    origin = u.origin;
    pathname = u.pathname;
    search = u.search;
  } catch (err) {
    // Do nothing
  }

  const siteName =
    name || root || result["og:site_name"] || result["twitter:site"];
  const pn =
    pathname !== "" && pathname !== "/" && pathname.length > 0 && pathname;
  const defaultSlug = slugify(pn || host || siteName, { lower: true });
  const slug = defaultSlug.replaceAll(/\./g, "-");

  const payloadArray = [
    {
      name: "name",
      value: siteName || "",
    },
    {
      name: "host",
      value: host || "",
    },
    {
      name: "origin",
      value: origin || "",
    },
    {
      name: "pathname",
      value: pathname || "",
    },
    {
      name: "search",
      value: search || "",
    },
    {
      name: "href",
      value: href || "",
    },
    {
      name: "title",
      value: result.title || "",
    },
    {
      name: "ogTitle",
      value: result["og:title"] || "",
    },
    {
      name: "twitterTitle",
      value: result["twitter:title"] || "",
    },
    {
      name: "description",
      value: result.description || "",
    },
    {
      name: "ogDescription",
      value: result["og:description"] || "",
    },
    {
      name: "image",
      value: result.image || "",
    },
    {
      name: "ogImage",
      value: result["og:image"] || "",
    },
    {
      name: "twitterImage",
      value: result["twitter:image"] || "",
    },
    {
      name: "keywords",
      value: result.keywords || "",
    },
  ];

  let innerPayload = "";

  payloadArray.forEach(({ name, value }) => {
    innerPayload += `${name}: ${dump(value)}`;
  });

  const payload = `---
${innerPayload}
---`;

  try {
    const thePath = path.join(
      rootPath,
      "content",
      "discoveries",
      group,
      category,
      `${fileName || slug}.md`
    );
    await fs.writeFile(thePath, payload.trimStart().trimEnd());
    return payloadArray;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default defineEventHandler(async (event) => {
  try {
    const { websites } = await readBody(event);
    let items = websites as {
      url: string;
      category: string;
      group: string;
      name?: string;
      fileName?: string;
    }[];

    let promises = [] as Promise<{ name: string; value: any }[] | undefined>[];

    items.forEach(({ url, category, group, fileName, name }) => {
      if (!!url || !!category || !!group) {
        promises.push(execute(url, category, group, name, fileName));
      }
    });

    const data = await Promise.all(promises);

    return { message: "success", data };
  } catch (err: any) {
    console.log("ERROR OCCURED");
    throw new Error(err.message);
  }
});

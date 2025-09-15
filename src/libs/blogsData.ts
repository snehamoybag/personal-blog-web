import type { Blog } from "../types/Blog";
import coverImg from "../assets/placeholder-cover-img.jpg";

const blogs: Blog[] = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem laudantium eos est id explicabo sequi sit maxime eveniet inventore?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ea perspiciatis voluptates est enim, non sunt repudiandae, quidem saepe corrupti dolorem mollitia voluptatibus dolore nemo cum placeat minima, quos vel aliquid eos odio! Officiis expedita suscipit laudantium, culpa consequuntur praesentium aliquam recusandae accusamus eaque officia quasi. Nostrum quam, dignissimos, aliquam ratione necessitatibus voluptate suscipit, odit perferendis perspiciatis harum numquam fugit explicabo quia at exercitationem laboriosam molestiae? Adipisci cum aut ipsum expedita aperiam ducimus perferendis ut, nobis iste omnis obcaecati in est consequatur asperiores culpa unde repellendus repellat dicta cumque fugit quo magnam. Nemo incidunt molestiae nihil ipsa optio dolore accusantium.",
    status: "PUBLISHED",
    createdAt: new Date("10-02-2025"),
    updatedAt: new Date("10-02-2025"),
    imgUrls: [coverImg],
    tags: ["webdev", "javascript", "typescript"],

    authorId: 1,
    author: {
      id: 1,
      role: "NORMAL",
      profile: {
        id: 1,
        userId: 1,
        firstName: "Snehamoy",
        lastName: "Bag",
        joinedAt: new Date("08-02-2025"),
        avatarUrl: null,
        bio: null,
      },
    },
  },
];

export default blogs;

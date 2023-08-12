const toolbarOptions = [
   [{ header: [1, 2, 3, 4, 5, 6, false] }],
   [
      { bold: { ariaLabel: "Bold" } },
      { italic: { ariaLabel: "Italic" } },
      { underline: { ariaLabel: "Underline" } },
      { strike: { ariaLabel: "Strikethrough" } },
   ],
   [
      { list: "ordered", ariaLabel: "Ordered List" },
      { list: "bullet", ariaLabel: "Bullet List" },
   ],
   [{ align: [], ariaLabel: "Align" }],
   [
      { blockquote: { ariaLabel: "Blockquote" } },
      { "code-block": { ariaLabel: "Code Block" } },
   ],
   [
      { color: [], ariaLabel: "Text Color" },
      { background: [], ariaLabel: "Background Color" },
   ],
   [
      { link: { ariaLabel: "Insert Link" } },
      { image: { ariaLabel: "Insert Image" } },
      { video: { ariaLabel: "Insert Video" } },
   ],
   [{ clean: { ariaLabel: "Clear Formatting" } }],
]

export default toolbarOptions

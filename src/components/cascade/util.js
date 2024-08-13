export const menuData = [
  {
    label: "File",
    children: [
      {
        label: "New",
        children: [
          {
            label: "Document",
            children: [
              {
                label: "From Template",
                children: [{ label: "Resume" }, { label: "Invoice" }],
              },
              { label: "Blank Document" },
            ],
          },
          {
            label: "Spreadsheet",
            children: [
              {
                label: "From Template",
                children: [{ label: "Budget" }, { label: "Expense Report" }],
              },
              { label: "Blank Spreadsheet" },
            ],
          },
        ],
      },
      {
        label: "Open",
        children: [{ label: "Recent" }, { label: "From Drive" }],
      },
    ],
  },
  {
    label: "Edit",
    children: [
      { label: "Undo" },
      { label: "Redo" },
      {
        label: "Copy",
        children: [
          {
            label: "Copy as Text",
            children: [{ label: "Plain Text" }, { label: "Formatted Text" }],
          },
          {
            label: "Copy as Image",
            children: [{ label: "JPEG" }, { label: "PNG" }],
          },
        ],
      },
    ],
  },
  {
    label: "View",
    children: [
      { label: "Zoom In" },
      { label: "Zoom Out" },
      {
        label: "Fullscreen",
        children: [{ label: "Enter Fullscreen" }, { label: "Exit Fullscreen" }],
      },
    ],
  },
  {
    label: "Help",
    children: [
      { label: "Documentation" },
      {
        label: "Search",
        children: [{ label: "How to use" }, { label: "FAQ" }],
      },
    ],
  },
];

export default menuData;

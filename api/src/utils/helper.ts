
  export const valueWithMonths = [
    {
      month: 1,
      count: 0,
    },
    {
      month: 2,
      count: 0,
    },
    {
      month: 3,
      count: 0,
    },
    {
      month: 4,
      count: 0,
    },
    {
      month: 5,
      count: 0,
    },
    {
      month: 6,
      count: 0,
    },
    {
      month: 7,
      count: 0,
    },

    {
      month: 8,
      count: 0,
    },
    {
      month: 9,
      count: 0,
    },
    {
      month: 10,
      count: 0,
    },
    {
      month: 11,
      count: 0,
    },
    {
      month: 12,
      count: 0,
    },
  ];
  
  export const nameChanger = (string: string): string => {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
  
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w-.]+/g, "") // Remove all non-word characters
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };
  
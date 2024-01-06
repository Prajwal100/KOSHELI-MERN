import fs from "fs";

export const accessFile = async (source: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.access(source, (err) => {
      if (err) {
        reject(err);
        // "Error with directory format. Put csv file and photos in single zip without any sub directory.",
      } else {
        resolve();
        //  console.log("File Exists");
        //file exists
      }
    });
  });
};
export const unlinkFile = async (source: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(source, (err) => {
      if (err) {
        reject(err);
        // "Error with directory format. Put csv file and photos in single zip without any sub directory.",
      } else {
        resolve();
        //  console.log("File Exists");
        //file exists
      }
    });
  });
};

export const copyFile = async (
  source: string,
  destination: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.copyFile(source, destination, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

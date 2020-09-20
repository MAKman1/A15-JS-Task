type List = Folder[];

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type File = {
  id: string;
  name: string;
};

export default function move(list: List, source: string, destination: string): List {
  // finding destination index in folders list
  const destinationIndex: number = list.findIndex((f: Folder) => f.id === destination);
  if (destinationIndex < 0) throw new Error('You cannot specify a file as the destination');

  // finding and removing file from it's respected folder
  let sourceFile: File = { id: '', name: '' };
  for (let i = 0; i < list.length; i += 1) {
    for (let a = 0; a < list[i].files.length; a += 1) {
      if (list[i].files[a].id === source) [sourceFile] = list[i].files.splice(a, 1);
    }
  }

  // if file found, pushing it to destination folder
  // otherwise, throwing error
  if (sourceFile.id.length) list[destinationIndex].files.push(sourceFile);
  else throw new Error('You cannot move a folder');

  return list;
}

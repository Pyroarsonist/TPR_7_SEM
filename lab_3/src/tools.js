import fs from 'fs';

export const parseMatrix = () => {
  const text = fs.readFileSync('./input.txt').toString();
  return text.split('\n').map((x) =>
    x
      .split(' ')
      .filter((x) => x)
      .map((x) => +x)
  );
};

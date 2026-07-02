const licenseList = [
  "agpl-3.0",
  "apache-2.0",
  "bsd-2-clause",
  "bsd-3-clause",
  "cc0-1.0",
  "epl-2.0",
  "free-art-1.3",
  "gpl-2.0",
  "gpl-3.0",
  "lgpl-2.1",
  "lgpl-3.0",
  "mit",
  "mpl-2.0",
  "unlicense",
  "wtfpl",
];

console.log("Pick your license");
licenseList.forEach((license, index) => {
  console.log(`${index + 1}. ${license}`);
});

// 1. 使用标准内置的 prompt()，它会自动把提示语打印出来并等待用户输入，简单安全
const choiceInput = prompt("Your choice:");
let licenseChoice = Number(choiceInput?.trim());

if (isNaN(licenseChoice) || licenseChoice <= 0 || licenseChoice > licenseList.length) {
  console.log('\n===');
  console.log('Invalid input! Defaulting to MIT license');
  console.log('===\n');
  licenseChoice = 12; // 默认 mit
}
const license = licenseList[licenseChoice - 1];

// 2. 再次使用 prompt 获取作者名字
const authorName = prompt("Your name:")?.trim() || "Unknown";

const currentYear = new Date().getFullYear().toString();
const licenseLink = `https://raw.githubusercontent.com/nishanths/license/master/.templates/${license}.tmpl`;

const response = await fetch(licenseLink);
if (!response.ok) {
  console.error(`Failed to fetch license template: ${response.statusText}`);
  Deno.exit(1);
}
let data = await response.text();

data = data.replaceAll('{{.Year}}', currentYear);
data = data.replaceAll('{{.Name}}', authorName);

Deno.writeTextFileSync('./LICENSE', data);
console.log("✓ LICENSE file generated successfully!");

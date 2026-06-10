import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to our JSON databases
const PATHS = {
  portfolio: path.join(__dirname, 'src', 'data', 'portfolio.json'),
  testimonials: path.join(__dirname, 'src', 'data', 'testimonials.json'),
  skills: path.join(__dirname, 'src', 'data', 'skills.json')
};

// ANSI Color codes for beautiful UI
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  bgGray: '\x1b[100m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function loadJson(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`${COLORS.red}Error reading ${filePath}: ${error.message}${COLORS.reset}`);
    return null;
  }
}

function saveJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`${COLORS.green}✔ Changes saved successfully to ${path.basename(filePath)}${COLORS.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${COLORS.red}Error writing to ${filePath}: ${error.message}${COLORS.reset}`);
    return false;
  }
}

// Helper to extract YouTube video ID from any standard URL format
function extractYoutubeId(url) {
  if (!url) return '';
  url = url.trim();
  
  // If it's already just a 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // Regex matches standard watch URLs, mobile watch URLs, short links, embeds, and shorts
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return url; // Fallback
}

// ==========================================
// 1. PORTFOLIO MANAGER
// ==========================================
async function managePortfolio() {
  while (true) {
    const data = loadJson(PATHS.portfolio);
    if (!data) return;

    console.clear();
    console.log(`${COLORS.cyan}${COLORS.bold}======================================`);
    console.log(`💼 PORTFOLIO ITEMS MANAGER`);
    console.log(`======================================${COLORS.reset}`);
    console.log(`1. List Items`);
    console.log(`2. Add New Item`);
    console.log(`3. Update Item`);
    console.log(`4. Delete Item`);
    console.log(`5. Manage Categories (Filter Buttons)`);
    console.log(`6. Back to Main Menu`);
    console.log(`--------------------------------------`);

    const choice = await askQuestion('Select an option: ');
    if (choice === '1') {
      console.log(`\n${COLORS.bold}Active Portfolio Items:${COLORS.reset}`);
      data.portfolioItems.forEach((item) => {
        const mediaInfo = item.youtubeId 
          ? `YouTube: https://youtu.be/${item.youtubeId}` 
          : `Image: ${item.image}`;
        console.log(`  ${COLORS.yellow}[ID: ${item.id}]${COLORS.reset} ${item.title} (${COLORS.magenta}${item.category}${COLORS.reset}) | ${mediaInfo}`);
      });
      await askQuestion('\nPress Enter to continue...');
    } else if (choice === '2') {
      console.log(`\n${COLORS.bold}Add Portfolio Item:${COLORS.reset}`);
      const category = await askQuestion('Enter Category (all / motion / short / ai / video / creatives): ');
      
      let title, youtubeIdInput, image, aspect, colSpan;
      
      if (category.toLowerCase().trim() === 'all') {
        const sourceIdStr = await askQuestion('Enter the ID of the existing item to add to the "All" category: ');
        const sourceId = parseInt(sourceIdStr, 10);
        const sourceItem = data.portfolioItems.find(item => item.id === sourceId);
        
        if (!sourceItem) {
          console.log(`${COLORS.red}Error: Item with ID ${sourceId} not found.${COLORS.reset}`);
          await askQuestion('Press Enter to continue...');
          continue;
        }
        
        title = sourceItem.title;
        youtubeIdInput = sourceItem.youtubeId || '';
        image = sourceItem.image || '';
        aspect = sourceItem.aspect;
        colSpan = sourceItem.colSpan;
        
        console.log(`${COLORS.green}Loaded details from item [ID ${sourceId}]: "${title}"${COLORS.reset}`);
      } else {
        title = await askQuestion('Enter Title: ');
        youtubeIdInput = await askQuestion('Enter YouTube Video URL or ID (leave blank for image): ');
        image = await askQuestion('Enter Image Path/URL (leave blank for video): ');
        aspect = await askQuestion('Enter Aspect Ratio (aspect-[9/16] / aspect-video / aspect-square): ');
        colSpan = await askQuestion('Enter Column Span (col-span-1 / col-span-2): ');
      }

      const nextId = data.portfolioItems.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const newItem = { id: nextId, title, category: category.toLowerCase().trim(), aspect, colSpan };
      
      if (youtubeIdInput) newItem.youtubeId = extractYoutubeId(youtubeIdInput);
      if (image) newItem.image = image;

      data.portfolioItems.push(newItem);
      saveJson(PATHS.portfolio, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '3') {
      console.log(`\n${COLORS.bold}Update Portfolio Item:${COLORS.reset}`);
      const idStr = await askQuestion('Enter the ID of the item to update: ');
      const id = parseInt(idStr, 10);
      const itemIndex = data.portfolioItems.findIndex(item => item.id === id);

      if (itemIndex === -1) {
        console.log(`${COLORS.red}Item with ID ${id} not found.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const item = data.portfolioItems[itemIndex];
      console.log(`\nUpdating item: ${COLORS.yellow}${item.title}${COLORS.reset}`);
      
      const newTitle = await askQuestion(`Title [${item.title}]: `);
      if (newTitle) item.title = newTitle;

      const newCategory = await askQuestion(`Category [${item.category}]: `);
      if (newCategory) item.category = newCategory;

      const newYoutubeId = await askQuestion(`YouTube ID/URL [${item.youtubeId || 'none'} - type 'clear' to remove]: `);
      if (newYoutubeId) {
        if (newYoutubeId.toLowerCase() === 'clear') {
          delete item.youtubeId;
        } else {
          item.youtubeId = extractYoutubeId(newYoutubeId);
        }
      }

      const newImage = await askQuestion(`Image Path [${item.image || 'none'} - type 'clear' to remove]: `);
      if (newImage) {
        if (newImage.toLowerCase() === 'clear') {
          delete item.image;
        } else {
          item.image = newImage;
        }
      }

      const newAspect = await askQuestion(`Aspect [${item.aspect}]: `);
      if (newAspect) item.aspect = newAspect;

      const newColSpan = await askQuestion(`ColSpan [${item.colSpan}]: `);
      if (newColSpan) item.colSpan = newColSpan;

      saveJson(PATHS.portfolio, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '4') {
      console.log(`\n${COLORS.bold}Delete Portfolio Item:${COLORS.reset}`);
      const idStr = await askQuestion('Enter the ID of the item to delete: ');
      const id = parseInt(idStr, 10);
      const itemIndex = data.portfolioItems.findIndex(item => item.id === id);

      if (itemIndex === -1) {
        console.log(`${COLORS.red}Item with ID ${id} not found.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const item = data.portfolioItems[itemIndex];
      const confirm = await askQuestion(`Are you sure you want to delete "${item.title}"? (y/n): `);
      if (confirm.toLowerCase() === 'y') {
        data.portfolioItems.splice(itemIndex, 1);
        saveJson(PATHS.portfolio, data);
      }
      await askQuestion('Press Enter to continue...');
    } else if (choice === '5') {
      while (true) {
        console.clear();
        console.log(`${COLORS.cyan}${COLORS.bold}======================================`);
        console.log(`📁 CATEGORY / FILTER MANAGER`);
        console.log(`======================================${COLORS.reset}`);
        console.log(`1. List Categories`);
        console.log(`2. Add New Category`);
        console.log(`3. Update Category`);
        console.log(`4. Delete Category`);
        console.log(`5. Back to Portfolio Menu`);
        console.log(`--------------------------------------`);
        
        const catChoice = await askQuestion('Select an option: ');
        if (catChoice === '1') {
          console.log(`\n${COLORS.bold}Active Categories:${COLORS.reset}`);
          data.filterButtons.forEach((btn, idx) => {
            console.log(`  ${COLORS.yellow}[${idx + 1}]${COLORS.reset} ID: ${COLORS.magenta}${btn.id}${COLORS.reset} | Label: ${btn.label}`);
          });
          await askQuestion('\nPress Enter to continue...');
        } else if (catChoice === '2') {
          console.log(`\n${COLORS.bold}Add New Category:${COLORS.reset}`);
          const id = await askQuestion('Enter Category ID (e.g. motion, short, ai): ');
          const label = await askQuestion('Enter Display Label (e.g. Motion Graphics): ');
          if (id && label) {
            data.filterButtons.push({ id, label });
            saveJson(PATHS.portfolio, data);
          }
          await askQuestion('Press Enter to continue...');
        } else if (catChoice === '3') {
          console.log(`\n${COLORS.bold}Update Category:${COLORS.reset}`);
          data.filterButtons.forEach((btn, idx) => {
            console.log(`  ${COLORS.yellow}[${idx + 1}]${COLORS.reset} ID: ${btn.id} | Label: ${btn.label}`);
          });
          const idxStr = await askQuestion('Enter the category list number to update: ');
          const idx = parseInt(idxStr, 10) - 1;
          if (idx >= 0 && idx < data.filterButtons.length) {
            const btn = data.filterButtons[idx];
            const newId = await askQuestion(`ID [${btn.id}]: `);
            if (newId) btn.id = newId;
            const newLabel = await askQuestion(`Label [${btn.label}]: `);
            if (newLabel) btn.label = newLabel;
            saveJson(PATHS.portfolio, data);
          }
          await askQuestion('Press Enter to continue...');
        } else if (catChoice === '4') {
          console.log(`\n${COLORS.bold}Delete Category:${COLORS.reset}`);
          data.filterButtons.forEach((btn, idx) => {
            console.log(`  ${COLORS.yellow}[${idx + 1}]${COLORS.reset} ID: ${btn.id} | Label: ${btn.label}`);
          });
          const idxStr = await askQuestion('Enter the category list number to delete: ');
          const idx = parseInt(idxStr, 10) - 1;
          if (idx >= 0 && idx < data.filterButtons.length) {
            const btn = data.filterButtons[idx];
            if (btn.id === 'all') {
              console.log(`${COLORS.red}Cannot delete the "All" category.${COLORS.reset}`);
            } else {
              const confirm = await askQuestion(`Delete category "${btn.label}"? (y/n): `);
              if (confirm.toLowerCase() === 'y') {
                data.filterButtons.splice(idx, 1);
                saveJson(PATHS.portfolio, data);
              }
            }
          }
          await askQuestion('Press Enter to continue...');
        } else if (catChoice === '5') {
          break;
        }
      }
    } else if (choice === '6') {
      break;
    }
  }
}

// ==========================================
// 2. TESTIMONIALS MANAGER
// ==========================================
async function manageTestimonials() {
  while (true) {
    const data = loadJson(PATHS.testimonials);
    if (!data) return;

    console.clear();
    console.log(`${COLORS.cyan}${COLORS.bold}======================================`);
    console.log(`💬 TESTIMONIALS MANAGER`);
    console.log(`======================================${COLORS.reset}`);
    console.log(`1. List Testimonials`);
    console.log(`2. Add New Testimonial`);
    console.log(`3. Update Testimonial`);
    console.log(`4. Delete Testimonial`);
    console.log(`5. Back to Main Menu`);
    console.log(`--------------------------------------`);

    const choice = await askQuestion('Select an option: ');
    if (choice === '1') {
      console.log(`\n${COLORS.bold}Active Testimonials:${COLORS.reset}`);
      data.forEach((t, i) => {
        console.log(`  ${COLORS.yellow}[${i + 1}]${COLORS.reset} ${t.name} (${COLORS.magenta}${t.role}${COLORS.reset})`);
        console.log(`      Quote: ${COLORS.cyan}${t.text}${COLORS.reset}`);
      });
      await askQuestion('\nPress Enter to continue...');
    } else if (choice === '2') {
      console.log(`\n${COLORS.bold}Add Testimonial:${COLORS.reset}`);
      const text = await askQuestion('Enter Text/Quote: ');
      const name = await askQuestion('Enter Client Name: ');
      const role = await askQuestion('Enter Role/Company: ');
      const avatar = await askQuestion('Enter Avatar URL: ');

      const newTestimonial = { text, name, role, avatar };
      data.push(newTestimonial);
      saveJson(PATHS.testimonials, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '3') {
      console.log(`\n${COLORS.bold}Update Testimonial:${COLORS.reset}`);
      const indexStr = await askQuestion('Enter the list number of the testimonial to update: ');
      const index = parseInt(indexStr, 10) - 1;

      if (index < 0 || index >= data.length) {
        console.log(`${COLORS.red}Invalid selection.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const t = data[index];
      console.log(`\nUpdating testimonial for: ${COLORS.yellow}${t.name}${COLORS.reset}`);
      
      const newText = await askQuestion(`Text [${t.text}]: `);
      if (newText) t.text = newText;

      const newName = await askQuestion(`Name [${t.name}]: `);
      if (newName) t.name = newName;

      const newRole = await askQuestion(`Role [${t.role}]: `);
      if (newRole) t.role = newRole;

      const newAvatar = await askQuestion(`Avatar [${t.avatar}]: `);
      if (newAvatar) t.avatar = newAvatar;

      saveJson(PATHS.testimonials, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '4') {
      console.log(`\n${COLORS.bold}Delete Testimonial:${COLORS.reset}`);
      const indexStr = await askQuestion('Enter the list number of the testimonial to delete: ');
      const index = parseInt(indexStr, 10) - 1;

      if (index < 0 || index >= data.length) {
        console.log(`${COLORS.red}Invalid selection.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const t = data[index];
      const confirm = await askQuestion(`Are you sure you want to delete testimonial by "${t.name}"? (y/n): `);
      if (confirm.toLowerCase() === 'y') {
        data.splice(index, 1);
        saveJson(PATHS.testimonials, data);
      }
      await askQuestion('Press Enter to continue...');
    } else if (choice === '5') {
      break;
    }
  }
}

// ==========================================
// 3. SKILLS MANAGER
// ==========================================
async function manageSkills() {
  while (true) {
    const data = loadJson(PATHS.skills);
    if (!data) return;

    console.clear();
    console.log(`${COLORS.cyan}${COLORS.bold}======================================`);
    console.log(`🛠 SOFTWARE SKILLS MANAGER`);
    console.log(`======================================${COLORS.reset}`);
    console.log(`1. List Skills`);
    console.log(`2. Add New Skill`);
    console.log(`3. Update Skill`);
    console.log(`4. Delete Skill`);
    console.log(`5. Back to Main Menu`);
    console.log(`--------------------------------------`);

    const choice = await askQuestion('Select an option: ');
    if (choice === '1') {
      console.log(`\n${COLORS.bold}Active Software Skills:${COLORS.reset}`);
      data.forEach((s, i) => {
        console.log(`  ${COLORS.yellow}[${i + 1}]${COLORS.reset} ${s.name} (${s.shortcut}) | Color: ${s.color}`);
      });
      await askQuestion('\nPress Enter to continue...');
    } else if (choice === '2') {
      console.log(`\n${COLORS.bold}Add Skill:${COLORS.reset}`);
      const name = await askQuestion('Enter Skill Name: ');
      const shortcut = await askQuestion('Enter Shortcut (e.g. Ae, Pr): ');
      const color = await askQuestion('Enter Hex Color (e.g. #ea77ff): ');
      const bgClass = await askQuestion('Enter bgClass (e.g. bg-[#00005b] text-[#ea77ff]): ');
      
      const newSkill = { name, shortcut, color, bgClass };
      
      const isCustomLogo = await askQuestion('Is Custom Logo (DaVinci format)? (y/n): ');
      if (isCustomLogo.toLowerCase() === 'y') newSkill.isCustomLogo = true;

      const isBlenderLogo = await askQuestion('Is Blender logo? (y/n): ');
      if (isBlenderLogo.toLowerCase() === 'y') newSkill.isBlenderLogo = true;

      data.push(newSkill);
      saveJson(PATHS.skills, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '3') {
      console.log(`\n${COLORS.bold}Update Skill:${COLORS.reset}`);
      const indexStr = await askQuestion('Enter the list number of the skill to update: ');
      const index = parseInt(indexStr, 10) - 1;

      if (index < 0 || index >= data.length) {
        console.log(`${COLORS.red}Invalid selection.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const s = data[index];
      console.log(`\nUpdating skill: ${COLORS.yellow}${s.name}${COLORS.reset}`);
      
      const newName = await askQuestion(`Name [${s.name}]: `);
      if (newName) s.name = newName;

      const newShortcut = await askQuestion(`Shortcut [${s.shortcut}]: `);
      if (newShortcut) s.shortcut = newShortcut;

      const newColor = await askQuestion(`Color [${s.color}]: `);
      if (newColor) s.color = newColor;

      const newBgClass = await askQuestion(`bgClass [${s.bgClass || 'none'}]: `);
      if (newBgClass) s.bgClass = newBgClass;

      saveJson(PATHS.skills, data);
      await askQuestion('Press Enter to continue...');
    } else if (choice === '4') {
      console.log(`\n${COLORS.bold}Delete Skill:${COLORS.reset}`);
      const indexStr = await askQuestion('Enter the list number of the skill to delete: ');
      const index = parseInt(indexStr, 10) - 1;

      if (index < 0 || index >= data.length) {
        console.log(`${COLORS.red}Invalid selection.${COLORS.reset}`);
        await askQuestion('Press Enter to continue...');
        continue;
      }

      const s = data[index];
      const confirm = await askQuestion(`Are you sure you want to delete skill "${s.name}"? (y/n): `);
      if (confirm.toLowerCase() === 'y') {
        data.splice(index, 1);
        saveJson(PATHS.skills, data);
      }
      await askQuestion('Press Enter to continue...');
    } else if (choice === '5') {
      break;
    }
  }
}

// ==========================================
// MAIN LOOP
// ==========================================
async function main() {
  while (true) {
    console.clear();
    console.log(`${COLORS.green}${COLORS.bold}======================================`);
    console.log(`🚀 PORTFOLIO DATABASE TUI MANAGER`);
    console.log(`======================================${COLORS.reset}`);
    console.log(`1. Manage Portfolio & YouTube Works`);
    console.log(`2. Manage Client Testimonials`);
    console.log(`3. Manage Software Skills`);
    console.log(`4. Exit`);
    console.log(`--------------------------------------`);

    const choice = await askQuestion('Select an option: ');

    if (choice === '1') {
      await managePortfolio();
    } else if (choice === '2') {
      await manageTestimonials();
    } else if (choice === '3') {
      await manageSkills();
    } else if (choice === '4') {
      console.log(`\n${COLORS.bold}Goodbye!${COLORS.reset}\n`);
      rl.close();
      break;
    }
  }
}

main();

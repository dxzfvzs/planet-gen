import type { StoryTest } from "../../types/test.ts";

const b_1: StoryTest = {
  id: "b_1",
  title: "Rybí věda",
  content: [
    "B_y_l jednou jeden b_i_olog, který b_y_dlel blízko b_y_tu své bab_i_čky.",
    "B_y_l to b_y_strý a milý člověk, který se zajímal o b_y_liny i b_i_ologii.",
    "Každý den chodil kolem rybníka, kde pozoroval ryb_y_ a zapisoval si své objevy.",
    "Bab_i_čka b_y_ b_y_la b_ý_vala ráda, kdyb_y_ ji brával s sebou, ale raději seděla doma a připravovala b_y_linkový čaj.",
    "Oba b_y_li spokojení, protože b_y_li blízko a měli svůj klid."
  ],
  options: ["y", "ý", "i", "í"],
  scoring: { passThreshold: 0.7 }
};

const b_2: StoryTest = {
  id: "b_2",
  title: "Pepega",
  content: [
    "B_y_l jsem pepegou. Teď už nejsem. HAHA."
  ],
  options: ["y", "ý", "i", "í"],
  scoring: { passThreshold: 0.7 }
};

export const vyjm_b = [b_1, b_2]

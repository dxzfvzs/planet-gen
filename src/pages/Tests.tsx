import { useMemo, useState } from "react";

import { StoryTestRunner } from "../components/test/TestRunner.tsx";

import { vyjm_b } from "../structure/content/tests/vyjm_b.tsx";
import { type CategoryKey, categoryMap } from "../structure/types/categories.ts";
import { SpaceCategorySelector } from "../components/category-selector/CategorySelector.tsx";
import type { StoryTest } from "../structure/types/test.ts";

type Test = {
  id: string;
  title: string;
  meta?: string;
};

type CategoryGroup = {
  category: CategoryKey;
  meta: string;
  tests: Test[];
};

const categories: CategoryGroup[] = [
  {
    category: "vyjmenovana_slova",
    meta: "b",
    tests: vyjm_b,
  },
];

export default function Tests() {
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  const activeTest = useMemo(
    () =>
      categories
        .flatMap(c => c.tests)
        .find(t => t.id === activeTestId),
    [activeTestId]
  );

  const visibleCategories = useMemo(() => {
    if (!selectedCategory) return categories;
    return categories.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="mt-40">
      {!activeTest && (
        <>
          {/* CATEGORY SELECTOR */}
          <SpaceCategorySelector
            value={selectedCategory}
            onChange={(c) => {
              setSelectedCategory(c);
              setActiveTestId(null);
            }}
          />

          {/* TEST LIST */}
          <div className="space-y-6 mt-20">
            <h1 className="text-xl font-bold">Cvičení</h1>

            {visibleCategories.map(category => (
              <div key={category.category + category.meta} className="flex flex-col gap-2">
                <div className="font-bold">
                  {categoryMap[category.category] + " po " + category.meta.toUpperCase()}
                </div>

                {category.tests.map(test => (
                  <button
                    key={test.id}
                    onClick={() => setActiveTestId(test.id)}
                    className="p-4 rounded-xl bg-surface hover:bg-surface/80 transition w-full text-left"
                  >
                    <div className="font-semibold">{test.title}</div>
                    <div className="text-sm opacity-70">{test.meta}</div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {activeTest && (
        <StoryTestRunner
          test={activeTest as StoryTest}
          onExit={() => setActiveTestId(null)}
        />
      )}
    </div>
  );
}
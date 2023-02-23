import React from "react";

import { QuestionsLayout } from "@/layouts/QuestionsLayout";

export default function Home() {
  return (
  <QuestionsLayout limit={4} label="Все вопросы"></QuestionsLayout>
  )
}

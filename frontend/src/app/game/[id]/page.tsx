import { Heart } from "@/assets/icons/heart";
import { Card } from "@/components/Card";
import { CurrentBoss } from "@/components/CurrentBoss";
import { HealthBar } from "@/components/HealthBar";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex w-screen h-screen bg-green-700">
      <div className="flex w-full mx-6 my-12 gap-6">
        {/* HP Bar, Current BOSS */}
        <div className="flex flex-col justify-between w-3/12 bg-gray-500">
          <HealthBar />
          <CurrentBoss />
        </div>
        {/* Image, question  */}
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full h-4/6">
            <div className="relative w-full bg-transparent h-full rounded-xl overflow-hidden aspect-video">
              <Image
                className="object-fill"
                src="/question-image.jpg"
                fill
                alt="question-image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xl w-full h-2/6 bg-yellow-300 rounded-xl p-4">
            {/* Question header */}
            <div className="font-bold text-black">Вопрос 1</div>
            {/* Question text */}
            <div className="text-black">
              Какая актёрская пара никогда не снималась у кетрин бигелоу?
            </div>
            {/* Question additions */}
            <div className="flex gap-4 items-center justify-around text-black">
              <div>
                <p>а) Херрисон форд</p>
                <p>б) Крис Пратт и Марк Стронг</p>
                <p>в) Киану Ривз и Джейсон Кларк</p>
                <p>б) Джереми Реннер и Энтони маки</p>
              </div>
              <div>
                <p>а) Херрисон форд</p>
                <p>б) Крис Пратт и Марк Стронг</p>
                <p>в) Киану Ривз и Джейсон Кларк</p>
                <p>б) Джереми Реннер и Энтони маки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/12 h-screen border-l border-y border-gray-500 bg-gradient-to-b from-gray-900 to-gray-950 rounded-l-lg p-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Page;

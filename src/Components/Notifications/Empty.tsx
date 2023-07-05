import { RiMovie2Line } from "react-icons/ri";

interface IEmpty {
  message: string;
}

const Empty = ({ message }: IEmpty) => {
  return (
    <div className="flex-col w-full py-12 px-4 rounded border border-gray-400 bg-black gap-4">
      <div className="flex-col w-24 h-24 py-5 rounded-full bg-slate-500 text-red-500 text-4xl">
        <RiMovie2Line />
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
};

export default Empty;

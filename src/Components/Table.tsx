import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs tet-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-center leading-6 whitespace-nowrap px-5 py-6";
interface IRows {
  movie: {
    _id: string | number;
    image: string;
    name: string;
    category: string;
    language: string;
    year: string;
    time: string | number;
  };
  i?: number | string;
  admin: boolean;
}

const Rows = ({ movie, i, admin }: IRows) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-auto">
          <img
            className="h-full w-full object-cover"
            src={movie?.image ? movie.image : "/images/user.png"}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie?.name}</td>
      <td className={`${Text}`}>{movie?.category}</td>
      <td className={`${Text}`}>{movie?.language}</td>
      <td className={`${Text}`}>{movie?.year}</td>
      <td className={`${Text}`}>{movie?.time}hr</td>
      <td className={`${Text} float-right flex-row gap-2 flex`}>
        {admin ? (
          <>
            <button className="border border-gray-600 bg-dry flex-row gap-2 flex ">
              Edit <FaEdit className="text-green-500" />
            </button>
            <button className="bg-red-600 text-white rounded flex-col w-6 h-6">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-gray-600 bg-gray-600 flex-row gap-2 flex items-center rounded p-2">
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-red-600 text-white rounded flex-col w-11 h-11 flex items-center justify-center "
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};
const Table = ({ data, admin }: any) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-gray-700 divide-y divide-slate-700">
        <thead>
          <tr className="bg-slate-600">
            <th scope="col" className={Head}>
              Image
            </th>
            <th scope="col" className={Head}>
              Name
            </th>
            <th scope="col" className={Head}>
              Category
            </th>
            <th scope="col" className={Head}>
              Language
            </th>
            <th scope="col" className={Head}>
              Year
            </th>
            <th scope="col" className={Head}>
              Hours
            </th>

            <th scope="col" className={Head}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((item: any, index: number) => (
            <Rows movie={item} i={index} admin={admin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

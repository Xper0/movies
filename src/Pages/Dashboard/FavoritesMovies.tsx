import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "Components/Notifications/Loader";
import Table from "Components/Table";
import { UserLogin } from "interfaces/User";
import { deleteFavoriteMovies } from "Redux/APIs/userServices";
import Empty from "Components/Notifications/Empty";

const FavoritesMovies = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.userLogin);

  const { isLoading, isError, likedMovies } = useSelector(
    (state: any) => state.userGetFavoriteMovies
  );

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state: any) => state.userDeleteFavoriteMovies);

  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") &&
      dispatch(deleteFavoriteMoviesAction());
  };

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_FAVORITE_RESET",
      });
    }
  }, [dispatch, isError, deleteError]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2 flex justify-between p-4">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-red-500 font-medium rounded p-2 transition hover:bg-red-700"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : likedMovies?.length > 0 ? (
        <>
          <Table data={likedMovies} admin={false} />
        </>
      ) : (
        <Empty message="You have no favorites movies" />
      )}
    </SideBar>
  );
};

export default FavoritesMovies;

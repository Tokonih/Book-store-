import { useEffect } from "react";
import BookCarousel from "../../components/carousels/bookCarousel";
import Layout from "../../layouts/layout";
import { getAuthor } from "../../actions/authorActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import person from "../../asset/images/download.png"


const Author: React.FC = () => {
  const dispatch = useDispatch();
  const { success, loading, data, error } = useSelector(
    (state: RootState) => state.authorReducer
  );   
  const { authorId } = useParams();
  useEffect(() => {
    dispatch(getAuthor(authorId as string) as any);
  }, [authorId]);

  console.log(data.data);
 

  return (
    <Layout>
      {!loading || (!error && success) ? (
        <div className="max-w-[1440px] m-auto font-[poynter] font-[400] ">
          <div className="flex center gap-[50px]">
            <figure className="border h-[110px] w-[110px] rounded-[50%] overflow-hidden">
              <img src={person} className="w-full h-full" alt="" />
            </figure>
            <div className="flex items-start flex-col justify-start">
              <h1 className="text-center text-[36px]">{data?.data?.name}</h1>

              <p className="font-lato font-[400] text-[13px] leading-[1.5] pl-[] w-[80%] pb-[20px] text-[#21282d]">
                <b>{data?.data?.name}</b> {data?.data?.about}
              </p>
            </div>
          </div>
          <div className="my-[100px]">
            <div className="review-heading max-w-[1440px] m-auto pt-5 pb-[100px]">
              <h2 className="text-[1.8rem] text-center font-poynter">
                More From This Author
              </h2>
            </div>
            {/* <BookCarousel books={data?.data?.books} />; */}
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Layout>
  );
};

export default Author;

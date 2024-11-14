import React, { useEffect } from "react";
import Layout from "../../layouts/layout";
import Form from "../../components/Form";
import { useDispatch , useSelector} from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { adminSignupHandler } from "../../actions/accountActions";
import { registrationValidationSchema, FormikConfigType, ISignUp } from "../../components/Form/FormikConfig";
import BookCarousel from "../../components/carousels/bookCarousel";
import { getProfile } from "../../actions/profileActions";
import { useParams } from "react-router-dom";
import { BookData } from "../../types";
import BookCard from "../../components/cards/bookCard";
import person from "../../asset/images/download.png"


const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading,  error } = useSelector(
    (state: RootState) => state.profileReducer
  );

  const {profileId} = useParams()
  useEffect(()=>{
    dispatch( getProfile(profileId as string) as any )
  },[profileId])
  
  console.log(profile)

  const formikConfig: FormikConfigType = {
    initValues: {
      name: profile?.name,
      email: profile?.email as string,
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: (values: ISignUp) => {
      const userData = {
        name: values.name!,
        email: values.email,
        // password: values.password,
      };
      // dispatch(adminSignupHandler(userData));
    },
    buttonTitle: "Update profile",
  };

  return (
    <Layout>

      {
        !loading || (!error && profile) ? (

      <div className="max-w-[1440px] m-auto pb-[100px]">
        <div className="review-heading max-w-[1440px] m-auto pt-5 pb-[100px]">
          <h2 className="text-[1.8rem] text-center font-poynter">
            Your Profile
          </h2>
        </div>
        <div className="flex items-start gap-[50px]">
          <figure className="border h-[110px] w-[110px] rounded-[50%] overflow-hidden">
            <img src={person} className="w-full h-full" alt="" />
          </figure>
          <div className="w-[50%] ">
            <Form formikConfig={formikConfig} fields={["name","email"]} />
          </div>
        </div>

        <div className="review-heading max-w-[1440px] m-auto py-[100px]">
          <h2 className="text-[1.8rem] text-center font-poynter pb-[50px]">
            Read History
          </h2>
          <div className="flex items-start flex-wrap gap-5  gap-5 mt-[50px]">
              {profile?profile.readBooks?.map((bookData: any) => (
                <BookCard
                  id={bookData._id}
                  key={bookData._id}
                  imageUrl={bookData.images}
                  title={bookData.title}
                  author={bookData.author.name}
                  rating={bookData.ratings}
                />
              )) : <h4>No Read History</h4>}
            </div>

        </div>
      </div>
        ) : <h1>Loading</h1>
      }
    </Layout>
  );
};

export default Profile;

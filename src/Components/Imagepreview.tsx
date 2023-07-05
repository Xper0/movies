interface Imagepreview {
  image: string;
  name: string;
}

const ImagePreview = ({ image, name }: Imagepreview) => {
  console.log(image);
  return (
    <div className="w-32 mt-32 p-2 bg-main border border-border rounded">
      <img
        src={image ? image : "/images/user.png"}
        alt={name}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};

export default ImagePreview;

class SignedurlController < ApplicationController
  def index
    options = {path_style: true}
    headers = {"x-amz-acl" => "public-read" }

    @url = FOG.put_object_url('dragggg', "images/#{SecureRandom.uuid}/#{params[:objectName]}", 15.minutes.from_now.to_time.to_i, headers, options)

    # respond_to do |format|
    #   format.json { render :json => {:signedUrl => @url} }
    # end

    render json: @url

    # require 'aws-sdk'
    # options = {path_style: true}
    # headers = {"Content-Type" => params[:contentType], "x-amz-acl" => "public-read", "crossorigin" => "anonymous" }

    # @url = FOG.put_object_url('dragggg', "user_uploads/#{params[:objectName]}", 15.minutes.from_now.to_time.to_i, headers, options)

    # respond_to do |format|
    #   format.json { render :json => {:signedUrl => @url} }
    # end

    # s3 = Aws::S3::Resource.new
    # bucket = s3.bucket('dragggg')
    # signed_data = bucket.object("user_uploads/#{params[:title]}").presigned_post(:get, expires_in: 1*20.minutes)
    # render json: signed_data

    # Aws.config.update({
    #   region: ENV['AWS_REGION'],
    #   credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
    # })

    # post = Aws::S3::PresignedPost.new(Aws.config[:credentials], ENV['AWS_REGION'], ENV['S3_BUCKET'], {
    #   key: "user_uploads/#{params[:title]}",
    #   content_length_range: 0..1024,
    #   acl: 'private',
    #   metadata: {
    #     'original-filename' => '${filename}'
    #   }
    # })

    # signer = Aws::S3::Presigner.new
    # url = signer.presigned_url(:put_object, bucket: ENV['S3_BUCKET'], key: "user_uploads/#{params[:title]}")

    # render json: url
  end
end

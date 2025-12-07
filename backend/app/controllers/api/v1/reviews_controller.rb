module Api
  module V1
    class ReviewsController < ApplicationController
      def index
        if params[:course_offering_id]
          reviews = Review.where(course_offering_id: params[:course_offering_id])
        elsif params[:course_id]
          reviews = Review.joins(:course_offering).where(course_offerings: { course_id: params[:course_id] })
        elsif params[:professor_id]
          reviews = Review.joins(:course_offering).where(course_offerings: { professor_id: params[:professor_id] })
        else
          reviews = Review.all
        end
        render json: reviews
      end

      def create
        review = Review.new(review_params)
        if review.save
          render json: review, status: :created
        else
          render json: { errors: review.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
      end

      private

      def review_params
        params.require(:review).permit(:content, :rating, :course_offering_id)
      end
    end
  end
end


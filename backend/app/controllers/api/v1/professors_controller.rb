module Api
  module V1
    class ProfessorsController < ApplicationController
      def index
        professors = Professor.all
        render json: professors
      end

      def show
        professor = Professor.find(params[:id])
        render json: professor
      end

      def create
        professor = Professor.new(professor_params)
        if professor.save
          render json: professor, status: :created
        else
          render json: { errors: professor.errors }, status: :unprocessable_entity
        end
      end

      private

      def professor_params
        params.require(:professor).permit(:name)
      end
    end
  end
end


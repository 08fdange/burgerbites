class RatingsController < ApplicationController
    skip_before_action :authenticate_request, only: %i[show index create update]

    def index
        @ratings = Rating.all
        render json: @ratings
    end

    def show
        @rating = Rating.find(params[:id])
        render json: @rating
    end

    def create
        @rating = Rating.new(rating_params)

        if @rating.save
            render json: @rating
        else
            render json: @rating.errors
        end
    end

    def update
    end

    private

    def rating_params
        params.require(:rating).permit(:stars, :user_id, :place)
    end

end

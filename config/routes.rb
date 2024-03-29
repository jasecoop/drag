Rails.application.routes.draw do
  # get 'collections/new'

  # get 'collections/create'

  # get 'collections/update'

  # get 'collections/edit'

  # get 'collections/destroy'

  # get 'collections/show'

  # devise_for :users
  # get 'image/new'

  # get 'image/create'

  # get 'image/edit'

  # resources :images

  # get 'tags/:tag', to: 'images#index', as: :tag

  # get ':username/:collection', to: 'images#collection_index'

  # post 'edit_upload/:id' => 'images#edit_upload'

  # put 'update_user' => 'pages#update_user'
  # put 'update_user_size' => 'pages#update_user_size'
  root 'pages#home'
  resources :signedurl, only: :index
  get "*path" => 'pages#home'


  # resources :tags

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

json.id @profile.id
json.user_id @profile.user_id
json.username @profile.username
json.age @profile.age
json.summary @profile.summary
json.motivation @profile.motivation.body
json.picture_url asset_path(@profile.picture.url(:medium))
json.match_percentage @profile.match_percentage(current_user.profile)
json.user_id @profile.user_id

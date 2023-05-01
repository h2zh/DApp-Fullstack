import {AnyAction, PayloadAction, createSlice} from '@reduxjs/toolkit';
interface Campaign {
    projectAddress: string
    creatorAccount: string,
    title: string,
    description: string,
    targetAmount: number | undefined,
    deadline: number,
    currentAmt: number,
    minContribution: number | undefined,
}
const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        campaigns: [] as Campaign[], 
    },
    reducers: {
        addToCampaigns: (state, action: PayloadAction<Campaign>) => {
            state.campaigns.push(action.payload)
        },
        modifyCampaigns: (state, action) => {
            state.campaigns = action.payload
        },
        removeCampaigns: (state, action) => {
            state.campaigns =  state.campaigns.filter(c => c.deadline !== action.payload) 
        },
    }
});

export const {addToCampaigns, modifyCampaigns, removeCampaigns} = campaignsSlice.actions;
export default campaignsSlice.reducer;
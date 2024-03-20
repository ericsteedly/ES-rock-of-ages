import { useEffect } from "react"
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"

export const RockList = ({ rocks, fetchRocks }) => {

    const { mine } = useParams()

    const deleteRock = async (id) => {
        await fetch(`http://localhost:8000/rocks/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        }).then(()=>{
            fetchRocks(mine)
        })
    }
    
    useEffect(() => {
        fetchRocks(mine)
    }, [mine])

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <div>{rock.name} ({rock.type.label}) weighs {rock.weight}</div> 
                <div>In the collection of {rock.user.first_name} {rock.user.last_name}</div>
                {mine == "mine" ?
                <button 
                style={{
                    backgroundColor: "green",
                    padding: 6,
                    borderRadius: 5
                    }}
                onClick={()=>{deleteRock(rock.id)}}
                >Delete</button>
                : 
                ""}
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}

RockList.propTypes = {
    rock: PropTypes.arrayOf(PropTypes.object),
    fetchRocks: PropTypes.func
}


import { store } from '../db/db.js'

export async function listUsers(_request, response, next) { try { response.json(await store.listUsers()) } catch (error) { next(error) } }
export async function getUser(request, response, next) { try { const user = await store.getUser(Number(request.params.id)); if (!user) return response.status(404).json({ message: 'User not found' }); response.json(user) } catch (error) { next(error) } }
export async function createUser(request, response, next) { try { const name = request.body.name?.trim(); if (!name) return response.status(400).json({ message: 'Name is required' }); response.status(201).json(await store.createUser(name)) } catch (error) { next(error) } }
